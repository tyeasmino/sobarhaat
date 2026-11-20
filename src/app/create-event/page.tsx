import type { Metadata } from "next";

import { EventForm } from "@/components/event-form";
import { ProtectedRoute } from "@/components/protected-route";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Create an event — Sobar Haat",
  description: "Start a new community service drive in your neighbourhood.",
};

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            Private page
          </Badge>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Create an event
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Tell neighbours what you are planning. Only future dates are allowed —
            your email is saved with the event so it stays yours to manage.
          </p>
          <div className="mt-8">
            <EventForm />
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
