import type { Metadata } from "next";

import { AboutCauses, AboutImpact } from "@/components/about-impact";
import { AboutCta } from "@/components/about-cta";
import { AboutHero } from "@/components/about-hero";
import { AboutMission, AboutTimeline } from "@/components/about-story";

export const metadata: Metadata = {
  title: "About — Sobar Haat",
  description:
    "Learn why Sobar Haat exists: a community-first platform connecting neighbours, organisers and local causes through social-service events.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutTimeline />
      <AboutImpact />
      <AboutCauses />
      <AboutCta />
    </>
  );
}
