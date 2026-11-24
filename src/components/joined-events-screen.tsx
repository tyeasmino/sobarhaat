"use client";

import {
  ArrowRight02Icon,
  Calendar03Icon,
  CheckmarkCircle01Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatEventDate, formatEventTime } from "@/lib/events";
import { useJoinedEvents } from "@/lib/events-api";

export function JoinedEventsScreen() {
  const { events: joined, isLoading, error, reload } = useJoinedEvents();

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Badge variant="outline" className="rounded-full px-3 py-1">
          Private page
        </Badge>
        <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Joined events
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Your service drives, sorted by the date you are needed.
        </p>

        {isLoading ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
            <p className="text-sm text-muted-foreground">Loading your joined events...</p>
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-dashed border-destructive/40 bg-destructive/5 p-12 text-center">
            <p className="font-heading text-base font-semibold text-foreground">
              Could not load joined events
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" onClick={reload} className="mt-5 rounded-full">
              Try again
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {joined.length ? (
              joined.map((event) => (
                <Card
                  key={event.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border-border/70 bg-card/70 p-0"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={event.thumbnail}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[0.62rem] font-medium text-primary backdrop-blur-sm">
                      <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={1.8} className="size-3" />
                      You are joining
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-heading text-base font-semibold text-foreground">
                      {event.title}
                    </h2>
                    <div className="mt-3 grid gap-2 text-[0.7rem] text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <HugeiconsIcon icon={Calendar03Icon} strokeWidth={1.6} className="size-3.5 text-primary" />
                        {formatEventDate(event.date)} · {formatEventTime(event.time)}
                      </span>
                      <span className="flex items-center gap-2">
                        <HugeiconsIcon icon={Location01Icon} strokeWidth={1.6} className="size-3.5 text-primary" />
                        {event.location}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      render={<Link href={`/events/${event.id}`} />}
                      className="mt-3 h-9 w-full gap-1.5 rounded-lg text-xs"
                    >
                      View details
                      <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-3.5" />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="sm:col-span-2 rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
                <p className="font-heading text-base font-semibold text-foreground">
                  No joined events yet
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Browse upcoming drives and join the one that fits your weekend.
                </p>
                <Button render={<Link href="/events" />} className="mt-5 rounded-full">
                  Explore events
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
