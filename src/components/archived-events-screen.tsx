"use client";

import * as React from "react";
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { EventCard } from "@/components/event-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArchivedEvents } from "@/lib/events-api";

export function ArchivedEventsScreen() {
  const { events, isLoading, error } = useArchivedEvents();
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return events;
    return events.filter((event) =>
      `${event.title} ${event.location} ${event.description} ${event.type}`
        .toLowerCase()
        .includes(needle)
    );
  }, [events, query]);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            Public archive
          </Badge>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Past events
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Every completed community drive, newest first. Open any recap to see
            the date, location, cause and the team that made it happen — no
            account needed.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-border/70 bg-card/40 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <HugeiconsIcon
                icon={Search01Icon}
                strokeWidth={1.7}
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search past drives by cause or location"
                aria-label="Search archived events"
                className="h-11 rounded-full bg-background/70 pr-10 pl-10 text-sm"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={1.8} className="size-3.5" />
                </button>
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
              <span className="font-semibold text-foreground">{events.length}</span> past drives
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-6 rounded-3xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
            <p className="text-sm text-muted-foreground">Loading the archive from MongoDB...</p>
          </div>
        ) : error ? (
          <div className="mt-6 rounded-3xl border border-dashed border-destructive/40 bg-destructive/5 p-12 text-center">
            <p className="font-heading text-base font-semibold text-foreground">
              Could not load the archive
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : filtered.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} archived />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
            <p className="font-heading text-base font-semibold text-foreground">
              {events.length ? "No past drives match that search" : "The archive is empty"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {events.length
                ? "Try another cause or location, or clear the search."
                : "Completed drives will be listed here automatically."}
            </p>
            <Button
              render={<Link href="/events" />}
              variant="outline"
              className="mt-5 h-9 gap-2 rounded-full text-xs"
            >
              Browse upcoming events
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
