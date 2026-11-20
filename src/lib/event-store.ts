"use client";

import * as React from "react";

import { sampleEvents, type EventItem } from "@/lib/events";

const EVENTS_KEY = "sobar-haat-events";
const JOINS_KEY = "sobar-haat-joins";
const CHANGE_EVENT = "sobar-haat-events-changed";

export type JoinRecord = {
  eventId: string;
  userEmail: string;
  joinedAt: string;
};

function readEvents(): EventItem[] {
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    return raw ? (JSON.parse(raw) as EventItem[]) : sampleEvents;
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
