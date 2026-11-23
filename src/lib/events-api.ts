"use client";

import * as React from "react";

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
    if (!path) return;

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
  }, [path, revision, token]);

  const reload = React.useCallback(() => setRevision((value) => value + 1), []);

  // Derived instead of stored — no setState in the effect body.
  const isLoading = waiting || (Boolean(path) && loadedPath !== path);
  const shownError = waiting || path ? error : CONFIG_ERROR;
  return { data, isLoading, error: shownError, reload };
}

async function request<T>(
  path: string,
  init?: RequestInit,
  token?: string
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error(CONFIG_ERROR);

  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...((init?.headers as Record<string, string> | undefined) ?? {}),
      },
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

export function useMyEvents(email?: string, token?: string) {
  const { data, ...rest } = useApiResource<ApiEvent[]>(
    email ? eventsUrl(`/manage-events/${encodeURIComponent(email)}`) : null,
    !email,
    token
  );
  const events = React.useMemo(
    () => (Array.isArray(data) ? data.map(normalizeEvent) : []),
    [data]
  );
  return { events, ...rest };
}

export function useJoinedEvents() {
  const { data, ...rest } = useApiResource<ApiEvent[]>(
    eventsUrl("/joined-events")
  );
  const events = React.useMemo(
    () => (Array.isArray(data) ? data.map(normalizeEvent) : []),
    [data]
  );
  return { events, ...rest };
}

export async function createEvent(input: EventItem) {
  const result = await request<{ insertedId?: string; event?: ApiEvent }>(
    "/events",
    { method: "POST", body: JSON.stringify(input) }
  );
  notify();
  return result.event
    ? normalizeEvent(result.event)
    : { ...input, id: result.insertedId ?? input.id };
}

export async function updateEvent(input: EventItem) {
  const result = await request<{ event?: ApiEvent }>(
    `/manage-events/${encodeURIComponent(input.id)}`,
    { method: "PUT", body: JSON.stringify(input) }
  );
  notify();
  return result.event ? normalizeEvent(result.event) : input;
}

export async function deleteEvent(id: string, token?: string) {
  await request(
    `/manage-events/${encodeURIComponent(id)}`,
    { method: "DELETE" },
    token
  );
  notify();
}

export async function joinEvent(id: string) {
  const result = await request<{
    joined: boolean;
    alreadyJoined: boolean;
    volunteers: number;
  }>(`/events/${encodeURIComponent(id)}/join`, { method: "POST" });
  notify();
  return result;
}
