"use client";

import Link from "next/link";

import { useAuth } from "@/components/auth-provider";
import { EventForm } from "@/components/event-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEvent } from "@/lib/events-api";

export function EditEventScreen({ id }: { id: string }) {
  const { event, isLoading } = useEvent(id);
  const { user } = useAuth();
  const isOwner = Boolean(
    event && user && event.creatorEmail?.toLowerCase() === user.email.toLowerCase()
  );

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <Badge variant="outline" className="rounded-full px-3 py-1">
          Private page
        </Badge>
        <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Edit event
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Only the person who created an event can change its details.
        </p>

        <div className="mt-8">
          {isLoading ? (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
              <p className="text-sm text-muted-foreground">Loading event...</p>
            </div>
          ) : !event ? (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
              <p className="font-heading text-base font-semibold text-foreground">Event not found</p>
              <Button render={<Link href="/manage-events" />} className="mt-5 rounded-full">
                Back to manage events
              </Button>
            </div>
          ) : !isOwner ? (
            <div className="rounded-2xl border border-dashed border-destructive/40 bg-destructive/5 p-12 text-center">
              <p className="font-heading text-base font-semibold text-foreground">
                You cannot edit this event
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                It was created by another volunteer.
              </p>
              <Button render={<Link href="/manage-events" />} variant="outline" className="mt-5 rounded-full">
                Back to manage events
              </Button>
            </div>
          ) : (
            <EventForm initial={event} />
          )}
        </div>
      </div>
    </section>
  );
}
