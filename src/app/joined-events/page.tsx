import type { Metadata } from "next";

import { JoinedEventsScreen } from "@/components/joined-events-screen";
import { ProtectedRoute } from "@/components/protected-route";

export const metadata: Metadata = {
  title: "Joined events — Sobar Haat",
  description: "The community service drives you signed up for.",
};

export default function JoinedEventsPage() {
  return (
    <ProtectedRoute>
      <JoinedEventsScreen />
    </ProtectedRoute>
  );
}
