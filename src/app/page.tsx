import { Suspense } from "react";

import { EventsSkeleton } from "@/components/events-skeleton";
import { FeaturesSection } from "@/components/features-section";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { RecentEvents } from "@/components/recent-events";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Suspense fallback={<EventsSkeleton />}>
        <RecentEvents />
      </Suspense>
      <GallerySection />
      <NewsletterSection />
    </>
  );
}
