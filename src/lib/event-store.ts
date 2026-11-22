"use client";

import * as React from "react";

import { sampleEvents, type EventItem } from "@/lib/events";

const EVENTS_KEY = "sobar-haat-events";
const JOINS_KEY = "sobar-haat-joins";
const CHANGE_EVENT = "sobar-haat-events-changed";
const CLEANUP_KEY = "sobar-haat-dummy-cleanup-done";
const DUMMY_TITLES = new Set([
  "Community Cleanup at Mirpur Park",
  "testing health event",
  "Direct API Test Event",
]);

export type JoinRecord = {
  eventId: string;
  userEmail: string;
  joinedAt: string;
};

type ApiEvent = Partial<EventItem> & { _id?: string };

function normalizeApiEvent(raw: ApiEvent, index: number): EventItem {
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

function readEvents(): EventItem[] {
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    const events = raw ? (JSON.parse(raw) as EventItem[]) : sampleEvents;

    // One-time cleanup of the old dummy/test events left in the browser cache.
    if (!window.localStorage.getItem(CLEANUP_KEY)) {
      const cleaned = events.filter((event) => !DUMMY_TITLES.has(event.title));
      window.localStorage.setItem(EVENTS_KEY, JSON.stringify(cleaned));
      window.localStorage.setItem(CLEANUP_KEY, "1");
      return cleaned;
    }

    return events;
  } catch {
    return sampleEvents;
  }
}

function readJoins(): JoinRecord[] {
  try {
    const raw = window.localStorage.getItem(JOINS_KEY);
    return raw ? (JSON.parse(raw) as JoinRecord[]) : [];
  } catch {
    return [];
  }
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getEventsSnapshot() {
  return JSON.stringify(readEvents());
}

function getJoinsSnapshot() {
  return JSON.stringify(readJoins());
}

function getServerEventsSnapshot() {
  return JSON.stringify(sampleEvents);
}

function getServerJoinsSnapshot() {
  return "[]";
}

export function useEvents() {
  const raw = React.useSyncExternalStore(
    subscribe,
    getEventsSnapshot,
    getServerEventsSnapshot
  );
  return React.useMemo(() => JSON.parse(raw) as EventItem[], [raw]);
}

export function useJoins() {
  const raw = React.useSyncExternalStore(
    subscribe,
    getJoinsSnapshot,
    getServerJoinsSnapshot
  );
  return React.useMemo(() => JSON.parse(raw) as JoinRecord[], [raw]);
}

/** Overwrite the local cache with the backend list (Mongo is the source of truth). */
export function replaceEvents(events: EventItem[]) {
  window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  notify();
}

/**
 * Sync MongoDB events into the local cache once, then expose the normal
 * useEvents() store so cards, filters, details and joins keep working unchanged.
 */
export function useApiEvents() {
  const events = useEvents();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!apiUrl || loaded) return;
    let active = true;

    async function load() {
      try {
        const response = await fetch(`${apiUrl}/events`);
        if (!response.ok) return;
        const data = (await response.json()) as ApiEvent[];
        if (active && Array.isArray(data)) replaceEvents(data.map(normalizeApiEvent));
      } catch {
        // Offline: keep whatever is already cached.
      } finally {
        if (active) setLoaded(true);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [apiUrl, loaded]);

  return events;
}

function subscribeClock() {
  return () => {};
}

function getTodaySnapshot() {
  return new Date().toISOString().slice(0, 10);
}

function getServerTodaySnapshot() {
  return "2000-01-01";
}

export function useToday() {
  return React.useSyncExternalStore(
    subscribeClock,
    getTodaySnapshot,
    getServerTodaySnapshot
  );
}

function getNowSnapshot() {
  return Date.now();
}

function getServerNowSnapshot() {
  return 0;
}

export function useNow() {
  return React.useSyncExternalStore(
    subscribeClock,
    getNowSnapshot,
    getServerNowSnapshot
  );
}

export function upcomingOnly(events: EventItem[], today: string) {
  return events.filter((event) => event.date >= today);
}

export function createEvent(event: EventItem) {
  const events = readEvents();
  window.localStorage.setItem(EVENTS_KEY, JSON.stringify([event, ...events]));
  notify();
}

export function updateEvent(next: EventItem) {
  const events = readEvents().map((event) => (event.id === next.id ? next : event));
  window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  notify();
}

export function deleteEvent(id: string) {
  const events = readEvents().filter((event) => event.id !== id);
  window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  const joins = readJoins().filter((join) => join.eventId !== id);
  window.localStorage.setItem(JOINS_KEY, JSON.stringify(joins));
  notify();
}

export function joinEvent(eventId: string, userEmail: string) {
  const joins = readJoins();
  if (joins.some((join) => join.eventId === eventId && join.userEmail === userEmail)) {
    return false;
  }
  joins.push({ eventId, userEmail, joinedAt: new Date().toISOString() });
  window.localStorage.setItem(JOINS_KEY, JSON.stringify(joins));
  notify();
  return true;
}

export function getEventById(id: string) {
  return readEvents().find((event) => event.id === id);
}
