"use client";

import {
  Add01Icon,
  Calendar03Icon,
  Clock01Icon,
  EyeIcon,
  Location01Icon,
  PencilIcon,
  TrashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/toast-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNow, useToday } from "@/lib/clock";
import { formatEventDate, formatEventTime, parseEventTime, type EventItem } from "@/lib/events";
import { deleteEvent, useMyEvents } from "@/lib/events-api";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function EventRow({ event, token }: { event: EventItem; token?: string }) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const today = useToday();
  const now = useNow();

  // UI guard only — the Express route resolves the real owner from the
  // signed-in BetterAuth session, so a forged request is still rejected.
  const isOwner =
    !!user?.email &&
    (!event.creatorEmail ||
      event.creatorEmail.toLowerCase() === user.email.toLowerCase());

  async function handleDeleteEvent() {
    if (!user?.email) {
      toast({
        variant: "error",
        title: "Could not delete event",
        description: "Your session is not available. Please sign in again.",
      });
      return;
    }

    setIsDeleting(true);
    try {
      await deleteEvent(event.id, token);
      setOpen(false);
      toast({ variant: "success", title: "Event deleted" });
    } catch (cause) {
      toast({
        variant: "error",
        title: "Could not delete event",
        description: cause instanceof Error ? cause.message : "Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  // Status depends on the exact event moment (date + time), not just the day.
  const canonicalTime = parseEventTime(event.time) ?? event.time;
  const [hours, minutes] = canonicalTime.split(":").map(Number);
  const startsAt = new Date(
    `${event.date}T${String(hours ?? 0).padStart(2, "0")}:${String(minutes ?? 0).padStart(2, "0")}:00`
  );
  const isPast = startsAt.getTime() < now;
  const status = isPast ? "Archived" : event.date === today ? "Today" : "Upcoming";

  const day = event.date.slice(8, 10);
  const month = MONTHS[Number(event.date.slice(5, 7)) - 1] ?? event.date.slice(5, 7);
  const createdDate = event.createdAt ?? today;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-border/70 bg-card/70 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      {/* Full-bleed cover */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent" />
        <Badge className="absolute top-4 left-4 rounded-full bg-background/90 text-[0.6rem] text-foreground shadow-sm backdrop-blur-sm">
          {event.type}
        </Badge>
        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-[0.6rem] font-semibold text-foreground shadow-sm backdrop-blur-sm">
          <span
            className={cn(
              "size-1.5 rounded-full",
              status === "Today" ? "bg-primary" : status === "Upcoming" ? "bg-emerald-500" : "bg-muted-foreground"
            )}
          />
          {status}
        </span>
      </div>

      {/* Overlapping date tile */}
      <div className="relative z-10 -mt-8 flex items-end justify-between gap-3 px-5">
        <div className="grid h-16 w-14 place-items-center rounded-2xl border border-border/70 bg-card shadow-lg shadow-foreground/5">
          <span className="font-heading text-2xl leading-none font-bold text-foreground">{day}</span>
          <span className="mt-0.5 text-[0.55rem] font-bold tracking-[0.15em] text-primary">{month}</span>
        </div>
        <span className="mb-1.5 inline-flex items-center gap-1.5 text-[0.68rem] text-muted-foreground">
          <HugeiconsIcon icon={Clock01Icon} strokeWidth={1.7} className="size-3.5 text-primary" />
          {formatEventTime(event.time)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pt-3 pb-4">
        <p className="text-[0.58rem] font-semibold tracking-[0.18em] text-primary uppercase">
          Your event
        </p>
        <h3 className="mt-1 font-heading text-base leading-snug font-semibold text-foreground">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
          {event.description}
        </p>
        <div className="mt-3 flex min-w-0 items-center gap-1.5 text-[0.7rem] text-muted-foreground">
          <HugeiconsIcon icon={Location01Icon} strokeWidth={1.7} className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-[0.62rem] text-muted-foreground/80">
          <HugeiconsIcon icon={Calendar03Icon} strokeWidth={1.7} className="size-3.5 text-primary" />
          Created {formatEventDate(createdDate)}
        </div>
      </div>

      {/* Actions */}
      <div className="mx-5 mb-5 flex items-center gap-2 border-t border-border/60 pt-3.5">
        <Button
          variant="outline"
          size="sm"
          render={<Link href={`/events/${event.id}`} />}
          className="h-8 flex-1 gap-1.5 rounded-full text-[0.7rem]"
        >
          <HugeiconsIcon icon={EyeIcon} strokeWidth={1.8} className="size-3.5" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          render={<Link href={`/manage-events/${event.id}/edit`} />}
          disabled={!isOwner}
          className="h-8 flex-1 gap-1.5 rounded-full text-[0.7rem]"
        >
          <HugeiconsIcon icon={PencilIcon} strokeWidth={1.8} className="size-3.5" />
          Edit
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                disabled={!isOwner}
                aria-label={`Delete ${event.title}`}
                className="size-8 shrink-0 rounded-full text-destructive hover:bg-destructive/10"
              />
            }
          >
            <HugeiconsIcon icon={TrashIcon} strokeWidth={1.8} className="size-4" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this event?</AlertDialogTitle>
              <AlertDialogDescription>
                “{event.title}” will be removed permanently, along with its join records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep it</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={isDeleting || !isOwner}
                onClick={handleDeleteEvent}
              >
                {isDeleting ? "Deleting..." : "Delete event"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}

export function ManageEventsScreen({ token }: { token?: string }) {
  const { user } = useAuth();
  // JWT from the server component (`auth.api.getToken`) is sent as
  // Authorization: Bearer <jwt>; the Express API verifies it against JWKS.
  const {
    events: mine,
    isLoading,
    error,
    reload,
  } = useMyEvents(user?.email, token);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Private page
            </Badge>
            <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Manage events
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Only events you created show up here. Edit or delete them anytime.
            </p>
          </div>
          <Button render={<Link href="/create-event" />} className="h-10 gap-2 rounded-full text-xs">
            <HugeiconsIcon icon={Add01Icon} strokeWidth={1.8} className="size-4" />
            Create event
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {error ? (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
              <p className="font-heading text-base font-semibold text-foreground">
                Could not load your events
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={reload}
                className="mt-4 h-9 rounded-lg text-xs"
              >
                Try again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
              <p className="font-heading text-base font-semibold text-foreground">
                Loading your events...
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Fetching from the event service.
              </p>
            </div>
          ) : mine.length ? (
            [...mine]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((event) => <EventRow key={event.id} event={event} token={token} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
              <p className="font-heading text-base font-semibold text-foreground">
                You have not created any events yet
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Start a drive and it will appear here for editing.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
