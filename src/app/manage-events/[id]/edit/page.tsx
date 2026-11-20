import { Suspense } from "react";
import type { Metadata } from "next";

import { EditEventScreen } from "@/components/edit-event-screen";
import { ProtectedRoute } from "@/components/protected-route";

export const metadata: Metadata = {
  title: "Edit event — Sobar Haat",
  description: "Update one of your community service events.",
};

async function EditForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <ProtectedRoute>
      <EditEventScreen id={id} />
    </ProtectedRoute>
  );
}

export default function EditEventPage(props: {
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
      <EditForm {...props} />
    </Suspense>
  );
}
