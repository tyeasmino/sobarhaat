"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Add01Icon,
  Calendar03Icon,
  Location01Icon,
  PencilIcon,
  TrashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/toast-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { formatEventDate, type EventItem } from "@/lib/events";
import { deleteEvent, useEvents } from "@/lib/event-store";

function EventRow({ event }: { event: EventItem }) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  return (
    <Card className="flex flex-col gap-4 rounded-2xl border-border/70 bg-card/70 p-4 sm:flex-row sm:items-center">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
        <Image src={event.thumbnail} alt="" fill sizes="80px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-sm font-semibold text-foreground">{event.title}</h3>
          <Badge variant="secondary" className="rounded-full text-[0.6rem]">
            {event.type}
          </Badge>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.68rem] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Calendar03Icon} strokeWidth={1.6} className="size-3.5" />
            {formatEventDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Location01Icon} strokeWidth={1.6} className="size-3.5" />
            {event.location}
          </span>
        </div>
      </div>

      <div className="flex gap-2 sm:shrink-0">
        <Button
          variant="outline"
          size="sm"
          render={<Link href={`/manage-events/${event.id}/edit`} />}
          className="h-9 flex-1 gap-1.5 rounded-lg text-xs sm:flex-none"
        >
          <HugeiconsIcon icon={PencilIcon} strokeWidth={1.8} className="size-3.5" />
          Edit
        </Button>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="h-9 flex-1 gap-1.5 rounded-lg text-xs text-destructive sm:flex-none"
              />
            }
          >
            <HugeiconsIcon icon={TrashIcon} strokeWidth={1.8} className="size-3.5" />
            Delete
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
                onClick={() => {
                  deleteEvent(event.id);
                  setOpen(false);
                  toast({ variant: "success", title: "Event deleted" });
                }}
              >
                Delete event
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}

export function ManageEventsScreen() {
  const events = useEvents();
  const { user } = useAuth();

  const mine = React.useMemo(
    () =>
      events
        .filter((event) => event.creatorEmail === user?.email)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [events, user?.email]
  );

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
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

        <div className="mt-8 grid gap-3">
          {mine.length ? (
            mine.map((event) => <EventRow key={event.id} event={event} />)
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
