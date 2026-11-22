"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar03Icon,
  CheckmarkCircle01Icon,
  GroupIcon,
  HandHeartIcon,
  HeartIcon,
  Location01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/toast-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatEventDate, formatEventTime } from "@/lib/events";
import { joinEvent, useEvents, useJoins } from "@/lib/event-store";

export function EventDetails({ id }: { id: string }) {
  const events = useEvents();
  const joins = useJoins();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const event = events.find((item) => item.id === id);
  const joined = Boolean(
    user && joins.some((join) => join.eventId === id && join.userEmail === user.email)
  );

  if (!event) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">Event not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This drive may have been removed. Browse the other upcoming events.
        </p>
        <Button render={<Link href="/events" />} className="mt-6 rounded-full">
          Back to events
        </Button>
      </div>
    );
  }

  function handleJoin() {
    if (!user) {
      toast({
        variant: "info",
        title: "Log in to join",
        description: "You need an account before joining a service drive.",
      });
      router.push("/login");
      return;
    }

    const added = joinEvent(id, user.email);
    toast({
      variant: added ? "success" : "info",
      title: added ? "You are in!" : "Already joined",
      description: added
        ? `You joined ${event?.title}. Find it under Joined Events.`
        : "This drive is already on your list.",
    });
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          ← All events
        </Link>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 bg-muted">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full">{event.type}</Badge>
              <Badge variant="outline" className="rounded-full gap-1.5">
                <HugeiconsIcon icon={Shield01Icon} strokeWidth={1.6} className="size-3" />
                Verified organiser
              </Badge>
            </div>

            <h1 className="mt-4 font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
              {event.title}
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{event.description}</p>

            <div className="mt-6 grid gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3.5">
                <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <HugeiconsIcon icon={Calendar03Icon} strokeWidth={1.8} className="size-4" />
                </span>
                <span>
                  <span className="block text-[0.65rem] text-muted-foreground">When</span>
                  <span className="block text-sm font-medium text-foreground">
                    {formatEventDate(event.date)} · {formatEventTime(event.time)}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3.5">
                <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <HugeiconsIcon icon={Location01Icon} strokeWidth={1.8} className="size-4" />
                </span>
                <span>
                  <span className="block text-[0.65rem] text-muted-foreground">Where</span>
                  <span className="block text-sm font-medium text-foreground">{event.location}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3.5">
                <span className="grid size-9 place-items-center rounded-lg bg-coral/15 text-coral">
                  <HugeiconsIcon icon={GroupIcon} strokeWidth={1.8} className="size-4" />
                </span>
                <span>
                  <span className="block text-[0.65rem] text-muted-foreground">Team so far</span>
                  <span className="block text-sm font-medium text-foreground">
                    {event.volunteers + (joined ? 1 : 0)} volunteers
                  </span>
                </span>
              </div>
            </div>

            <Card className="mt-6 rounded-2xl border-primary/20 bg-primary/5 p-4">
              <p className="flex items-center gap-2 text-xs font-medium text-foreground">
                <HugeiconsIcon icon={HeartIcon} strokeWidth={1.7} className="size-4 text-coral" />
                Organised by {event.creatorEmail ?? "a community volunteer"}
              </p>
              <Button
                onClick={handleJoin}
                disabled={joined}
                className="mt-4 h-11 w-full gap-2 rounded-full text-sm"
              >
                {joined ? (
                  <>
                    <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={1.8} className="size-4" />
                    Joined — see you there
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={HandHeartIcon} strokeWidth={1.8} className="size-4" />
                    Join this event
                  </>
                )}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
