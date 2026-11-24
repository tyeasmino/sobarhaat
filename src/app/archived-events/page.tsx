import type { Metadata } from "next";

import { ArchivedEventsScreen } from "@/components/archived-events-screen";

export const metadata: Metadata = {
  title: "Past events — Sobar Haat",
  description:
    "Browse completed community service drives and their details, open to everyone.",
};

export default function ArchivedEventsPage() {
  return <ArchivedEventsScreen />;
}
