import { Suspense } from "react";
import type { Metadata } from "next";

import { EventDetails } from "@/components/event-details";

export const metadata: Metadata = {
  title: "Event details — Sobar Haat",
  description: "See the details of a community service drive and join the team.",
};

async function Details({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EventDetails id={id} />;
}

export default function EventDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[60vh] place-items-center">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <Details {...props} />
    </Suspense>
  );
}
