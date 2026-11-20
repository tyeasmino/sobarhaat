import type { Metadata } from "next";

import { ManageEventsScreen } from "@/components/manage-events-screen";
import { ProtectedRoute } from "@/components/protected-route";

export const metadata: Metadata = {
  title: "Manage events — Sobar Haat",
  description: "Update or delete the community events you created.",
};

export default function ManageEventsPage() {
  return (
    <ProtectedRoute>
      <ManageEventsScreen />
    </ProtectedRoute>
  );
}
