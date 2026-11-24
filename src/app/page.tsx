import { Suspense } from "react";

import { ArchivedEvents } from "@/components/archived-events";
import { EventsSkeleton } from "@/components/events-skeleton";
import { FeaturesSection } from "@/components/features-section";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { RecentEvents } from "@/components/recent-events";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Suspense fallback={<EventsSkeleton />}>
        <RecentEvents />
      </Suspense>
      <Suspense fallback={<EventsSkeleton />}>
        <ArchivedEvents />
      </Suspense>
      <GallerySection />
      <NewsletterSection />
    </>
  );
}
