import type { Metadata } from "next";

import { ImpactHero } from "@/components/impact-hero";
import { ImpactBreakdown, ImpactGallery } from "@/components/impact-stats";
import { ImpactCta, ImpactStories, ImpactTransparency } from "@/components/impact-trust";

export const metadata: Metadata = {
  title: "Our Impact — Sobar Haat",
  description:
    "See the difference neighbours are making with Sobar Haat: service drives, people supported, districts reached and the volunteers behind every number.",
};

export default function ImpactPage() {
  return (
    <>
      <ImpactHero />
      <ImpactBreakdown />
      <ImpactGallery />
      <ImpactStories />
      <ImpactTransparency />
      <ImpactCta />
    </>
  );
}
