import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

import { ManageEventsScreen } from "@/components/manage-events-screen";
import { ProtectedRoute } from "@/components/protected-route";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Manage events — Sobar Haat",
  description: "Update or delete the community events you created.",
};

async function ManageEventsContent() {
  // Sir-er pattern: get a short-lived JWT for the signed-in user and hand it
  // to the client, which sends it as `Authorization: Bearer <token>`.
  const { token } = await auth.api.getToken({ headers: await headers() });

  return <ManageEventsScreen token={token} />;
}

export default function ManageEventsPage() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-24 text-center text-sm text-muted-foreground">
            Preparing your events...
          </div>
        }
      >
        <ManageEventsContent />
      </Suspense>
    </ProtectedRoute>
  );
}
