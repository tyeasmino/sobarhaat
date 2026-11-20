"use client";

import * as React from "react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { EventCard } from "@/components/event-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { upcomingOnly, useEvents, useToday } from "@/lib/event-store";

const eventTypes = [
  "All types",
  "Winter Support",
  "Donation",
  "Food Support",
  "Flood Relief",
  "Health",
  "Plantation",
  "Cleanup",
];

export default function EventsPage() {
  const events = useEvents();
  const today = useToday();
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState("All types");

  const filtered = React.useMemo(() => {
    return upcomingOnly(events, today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .filter((event) => {
        const matchesType = type === "All types" || event.type === type;
        const haystack = `${event.title} ${event.location} ${event.description}`.toLowerCase();
        return matchesType && haystack.includes(query.toLowerCase());
      });
  }, [events, query, today, type]);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            Open to everyone
          </Badge>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Upcoming events
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Every drive below needs a few more hands. Find one near you and join
            the team.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <HugeiconsIcon
              icon={Search01Icon}
              strokeWidth={1.7}
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by event, cause or location"
              aria-label="Search events"
              className="h-10 bg-card/70 pl-9 text-sm"
            />
          </div>
          <NativeSelect
            value={type}
            onChange={(event) => setType(event.target.value)}
            aria-label="Filter by event type"
            className="h-10 bg-card/70 text-sm sm:w-52"
          >
            {eventTypes.map((item) => (
              <NativeSelectOption key={item} value={item}>
                {item}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "event" : "events"} found
        </p>

        {filtered.length ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
            <p className="font-heading text-base font-semibold text-foreground">
              No events match that search
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different cause or clear the search box.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
