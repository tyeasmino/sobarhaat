"use client";

import * as React from "react";

import { getAuthToken } from "@/lib/auth-client";
import type { EventItem } from "@/lib/events";

/**
 * MongoDB is the single source of truth. No localStorage cache, no sample-data
 * fallback — every list/detail is fetched from the Express API.
 */

const CHANGE_EVENT = "sobar-haat:events-changed";
const CONFIG_ERROR =
  "Add NEXT_PUBLIC_API_URL=http://localhost:8000 to .env and restart the dev server.";

type ApiEvent = Partial<EventItem> & { _id?: string };

type Resource<T> = {
  data: T | null;
  isLoading: boolean;
  error: string;
  reload: () => void;
};

export function normalizeEvent(raw: ApiEvent, index = 0): EventItem {
  return {
    id: raw._id ?? raw.id ?? `event-${index}`,
    title: raw.title ?? "Untitled event",
    type: raw.type ?? "Donation",
    location: raw.location ?? "",
    date: raw.date ?? "",
    time: raw.time ?? "10:00",
    thumbnail: raw.thumbnail ?? "/events/winter-clothes.svg",
    description: raw.description ?? "",
    volunteers: typeof raw.volunteers === "number" ? raw.volunteers : 0,
    creatorEmail: raw.creatorEmail,
    creatorName: raw.creatorName,
    createdAt: raw.createdAt,
  };
}

function eventsUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_API_URL;
  return base ? `${base}${path}` : null;
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Read a fresh JWT for private API calls; re-read it for every mutation. */
function useAuthToken() {
  const [state, setState] = React.useState<{
    token?: string;
    isLoading: boolean;
  }>({ isLoading: true });

  React.useEffect(() => {
    let active = true;
    getAuthToken()
      .then((token) => {
        if (active) setState({ token, isLoading: false });
      })
      .catch(() => {
        if (active) setState({ isLoading: false });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}

function useApiResource<T>(
  path: string | null,
  waiting = false,
  token?: string
): Resource<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState("");
  const [loadedPath, setLoadedPath] = React.useState<string | null>(null);
  const [revision, setRevision] = React.useState(0);

  React.useEffect(() => {
    const onChange = () => setRevision((value) => value + 1);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);

  React.useEffect(() => {
    // Do not fire an unauthenticated request while the JWT is being prepared.
    if (!path || waiting) return;

    const controller = new AbortController();
    let active = true;

    fetch(path, {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => null);
        if (!response.ok) {
          const message = (payload as { message?: string } | null)?.message;
          throw new Error(message || `Server returned ${response.status}.`);
        }
        return payload as T;
      })
      .then((payload) => {
        if (!active) return;
        setData(payload);
        setError("");
      })
      .catch((cause: unknown) => {
        if (!active || controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : "Could not load data.");
      })
      .finally(() => {
        if (active) setLoadedPath(path);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [path, revision, token, waiting]);

  const reload = React.useCallback(() => setRevision((value) => value + 1), []);

  // Derived instead of stored — no setState in the effect body.
  const isLoading = waiting || (Boolean(path) && loadedPath !== path);
  const shownError = waiting || path ? error : CONFIG_ERROR;
  return { data, isLoading, error: shownError, reload };
}

/** Thin wrapper — headers are built explicitly by each calling method. */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error(CONFIG_ERROR);

  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      ...init,
      credentials: "include",
    });
  } catch {
    throw new Error("Cannot reach the event service. Is the Express server running?");
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = (payload as { message?: string } | null)?.message;
    throw new Error(message || `Server returned ${response.status}.`);
  }
  return payload as T;
}

export function useEvents() {
  const { data, ...rest } = useApiResource<ApiEvent[]>(eventsUrl("/events"));
  const events = React.useMemo(
    () => (Array.isArray(data) ? data.map(normalizeEvent) : []),
    [data]
  );
  return { events, ...rest };
}

export function useRecentEvents() {
  const { data, ...rest } = useApiResource<ApiEvent[]>(
    eventsUrl("/events/recent?limit=6")
  );
  const events = React.useMemo(
    () => (Array.isArray(data) ? data.map(normalizeEvent) : []),
    [data]
  );
  return { events, ...rest };
}

/** Public archive of past drives. `limit` is capped by the Express route. */
export function useArchivedEvents(limit?: number) {
  const path = eventsUrl(
    limit ? `/events/archived?limit=${limit}` : "/events/archived"
  );
  const { data, ...rest } = useApiResource<ApiEvent[]>(path);
  const events = React.useMemo(
    () => (Array.isArray(data) ? data.map(normalizeEvent) : []),
    [data]
  );
  return { events, ...rest };
}

export function useEvent(id?: string) {
  const { data, ...rest } = useApiResource<ApiEvent>(
    id ? eventsUrl(`/events/${encodeURIComponent(id)}`) : null
  );
  const event = React.useMemo(
    () => (data ? normalizeEvent(data) : null),
    [data]
  );
  return { event, ...rest };
}

export function useMyEvents(email?: string) {
  const { token, isLoading: tokenLoading } = useAuthToken();
  // The Express route resolves the owner from the Bearer JWT, so the email is
  // no longer part of the URL.
  const { data, ...rest } = useApiResource<ApiEvent[]>(
    email ? eventsUrl("/manage-events") : null,
    !email || tokenLoading,
    token
  );
  const events = React.useMemo(
    () => (Array.isArray(data) ? data.map(normalizeEvent) : []),
    [data]
  );
  return { events, ...rest };
}

export function useJoinedEvents() {
  const { token, isLoading: tokenLoading } = useAuthToken();
  const { data, ...rest } = useApiResource<ApiEvent[]>(
    eventsUrl("/joined-events"),
    tokenLoading,
    token
  );
  const events = React.useMemo(
    () => (Array.isArray(data) ? data.map(normalizeEvent) : []),
    [data]
  );
  return { events, ...rest };
}

export async function createEvent(input: EventItem) {
  const token = await getAuthToken();
  if (!token) throw new Error("Please sign in to create an event.");

  const result = await request<{ insertedId?: string; event?: ApiEvent }>(
    "/events",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  notify();
  return result.event
    ? normalizeEvent(result.event)
    : { ...input, id: result.insertedId ?? input.id };
}

export async function updateEvent(input: EventItem) {
  const token = await getAuthToken();
  if (!token) throw new Error("Please sign in to edit an event.");

  const result = await request<{ event?: ApiEvent }>(
    `/manage-events/${encodeURIComponent(input.id)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  notify();
  return result.event ? normalizeEvent(result.event) : input;
}

export async function deleteEvent(id: string) {
  const token = await getAuthToken();
  if (!token) throw new Error("Please sign in to delete an event.");

  await request(`/manage-events/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  notify();
}

export async function joinEvent(id: string) {
  const token = await getAuthToken();
  if (!token) throw new Error("Please sign in to join an event.");

  const result = await request<{
    joined: boolean;
    alreadyJoined: boolean;
    volunteers: number;
  }>(`/events/${encodeURIComponent(id)}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  notify();
  return result;
}
