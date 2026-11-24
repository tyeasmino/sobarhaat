"use client";

import * as React from "react";

/**
 * Shared clock for status labels ("Today", "Archived", ...).
 * Plain state + one shared timer — no useSyncExternalStore snapshot contract.
 */
const CLOCK_TICK_MS = 60_000;
let clockNow = 0;
let clockTimer: ReturnType<typeof setInterval> | undefined;
const clockListeners = new Set<() => void>();

function readClock() {
  if (typeof window === "undefined") return 0;
  if (clockNow === 0) clockNow = Date.now();
  return clockNow;
}

function tickClock() {
  clockNow = Date.now();
  clockListeners.forEach((listener) => listener());
}

function subscribeClock(listener: () => void) {
  const first = clockListeners.size === 0;
  clockListeners.add(listener);

  if (!clockTimer) {
    if (first) clockNow = Date.now();
    clockTimer = setInterval(tickClock, CLOCK_TICK_MS);
    if (first) clockListeners.forEach((current) => current());
  }

  return () => {
    clockListeners.delete(listener);
    if (clockListeners.size === 0 && clockTimer) {
      clearInterval(clockTimer);
      clockTimer = undefined;
    }
  };
}

function useClock<T>(select: (now: number) => T, serverValue: T): T {
  // Start with the server value so hydration matches; the effect sets real time.
  const [value, setValue] = React.useState<T>(serverValue);

  React.useEffect(() => {
    const update = () => setValue(select(readClock()));
    update();
    return subscribeClock(update);
  }, [select]);

  return value;
}

// `toISOString()` returns the UTC date. At 03:00 in Bangladesh (UTC+6) it is
// still the previous day in UTC, which wrongly allows yesterday to be picked.
// Sobar Haat uses Asia/Dhaka dates everywhere, so derive the date explicitly.
const dhakaDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Dhaka",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const toToday = (now: number) => dhakaDate.format(new Date(now));
const toTimestamp = (now: number) => now;

export function useToday() {
  return useClock(toToday, "2000-01-01");
}

export function useNow() {
  return useClock(toTimestamp, 0);
}
