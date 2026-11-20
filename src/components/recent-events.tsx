"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight02Icon,
  Calendar03Icon,
  GroupIcon,
  Location01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatEventDate, type EventItem } from "@/lib/events";
import { upcomingOnly, useEvents, useToday } from "@/lib/event-store";

export function RecentEvents() {
  const localEvents = useEvents();
  const today = useToday();
  const [remoteEvents, setRemoteEvents] = React.useState<EventItem[]>([]);

  React.useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    const controller = new AbortController();
    fetch(`${apiUrl}/events/recent?limit=6`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : []))
      .then((payload: unknown) => {
        const list = Array.isArray(payload)
          ? payload
          : (payload as { events?: unknown[] })?.events;
        if (Array.isArray(list)) setRemoteEvents(list as EventItem[]);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const events = React.useMemo(() => {
    const byId = new Map<string, EventItem>();
    for (const event of [...remoteEvents, ...localEvents]) byId.set(event.id, event);
    return upcomingOnly([...byId.values()], today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6);
  }, [localEvents, remoteEvents, today]);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Coming up next
            </Badge>
            <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Recent upcoming events
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Six newest service drives from the community, sorted by date. Pick one
              and lend a hand.
            </p>
          </div>
          <Button
            variant="outline"
            render={<Link href="/events" />}
            className="h-10 gap-2 rounded-full px-4 text-xs"
          >
            See all events
            <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-3.5" />
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="flex h-full flex-col rounded-2xl border-border/70 bg-card/70 p-0"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm">
                    {event.type}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-base leading-snug font-semibold text-foreground">
                  {event.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                  {event.description}
                </p>

                <div className="mt-4 grid gap-2 text-[0.7rem] text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon icon={Calendar03Icon} strokeWidth={1.6} className="size-3.5 text-primary" />
                    {formatEventDate(event.date)} · {event.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon icon={Location01Icon} strokeWidth={1.6} className="size-3.5 text-primary" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon icon={GroupIcon} strokeWidth={1.6} className="size-3.5 text-primary" />
                    {event.volunteers} volunteers joined
                  </span>
                </div>

                <Button
                  variant="outline"
                  render={<Link href={`/events/${event.id}`} />}
                  className="mt-auto h-9 w-full gap-1.5 rounded-lg text-xs"
                >
                  View event
                  <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
