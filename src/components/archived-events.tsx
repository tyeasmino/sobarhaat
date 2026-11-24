"use client";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { EventCard } from "@/components/event-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useArchivedEvents } from "@/lib/events-api";

export function ArchivedEvents() {
  const { events, isLoading, error } = useArchivedEvents(6);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              From the archive
            </Badge>
            <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Drives we have already run
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A look back at completed service drives — where they happened and
              what the volunteers achieved. Every recap is open to everyone.
            </p>
          </div>
          <Button
            variant="outline"
            render={<Link href="/archived-events" />}
            className="h-10 gap-2 rounded-full px-4 text-xs"
          >
            See all past events
            <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-3.5" />
          </Button>
        </div>

        {isLoading ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
            <p className="text-sm text-muted-foreground">Loading past drives...</p>
          </div>
        ) : error ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
            <p className="font-heading text-base font-semibold text-foreground">
              The archive is unavailable right now
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : events.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} archived />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
            <p className="font-heading text-base font-semibold text-foreground">
              No past drives in the archive yet
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Completed drives will appear here with their full details.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
