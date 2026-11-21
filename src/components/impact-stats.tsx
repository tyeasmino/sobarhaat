import Image from "next/image";
import {
  BloodIcon,
  CheckmarkCircle01Icon,
  GlobeIcon,
  RestaurantIcon,
  SnowIcon,
  Tree02Icon,
  UmbrellaIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";

const distribution = [
  { label: "Winter warmth", share: 38, bar: "bg-chart-1", icon: SnowIcon },
  { label: "Food support", share: 27, bar: "bg-chart-2", icon: RestaurantIcon },
  { label: "Flood relief", share: 18, bar: "bg-chart-3", icon: UmbrellaIcon },
  { label: "Blood donation", share: 11, bar: "bg-chart-4", icon: BloodIcon },
  { label: "Greener streets", share: 6, bar: "bg-chart-5", icon: Tree02Icon },
];

const reach = [
  { district: "Dhaka", share: 38 },
  { district: "Chattogram", share: 22 },
  { district: "Sylhet", share: 16 },
  { district: "Rajshahi", share: 12 },
];

const photos = [
  { src: "/gallery/blanket-handover.svg", alt: "A volunteer handing a blanket to a neighbour", caption: "Winter warmth" },
  { src: "/gallery/food-drive.svg", alt: "Volunteers packing grocery packs for a food drive", caption: "Food support" },
  { src: "/gallery/plantation.svg", alt: "Community members planting a sapling together", caption: "Greener streets" },
  { src: "/gallery/blood-camp.svg", alt: "A voluntary blood donation camp in the neighbourhood", caption: "Blood donation" },
];

export function ImpactBreakdown() {
  return (
    <section className="border-t border-border/60 bg-card/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Where the work lands
          </Badge>
          <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            The causes our community keeps answering.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            A look at how volunteer hours are spread across the needs we see most often.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="rounded-3xl border border-border/70 bg-background/70 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <HugeiconsIcon icon={GlobeIcon} strokeWidth={1.8} className="size-4" />
              </span>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                Share of service drives by cause
              </h3>
            </div>
            <div className="mt-7 space-y-5">
              {distribution.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <HugeiconsIcon icon={item.icon} strokeWidth={1.8} className="size-3.5 text-muted-foreground" />
                      {item.label}
                    </span>
                    <span className="font-heading font-semibold text-foreground">{item.share}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${item.bar}`} style={{ width: `${item.share}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-background/70 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent">
                <HugeiconsIcon icon={GlobeIcon} strokeWidth={1.8} className="size-4" />
              </span>
              <h3 className="font-heading text-sm font-semibold text-foreground">Where volunteers show up most</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {reach.map((item) => (
                <li key={item.district} className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                  <span className="text-xs font-medium text-foreground">{item.district}</span>
                  <span className="flex items-center gap-3">
                    <span className="h-1.5 w-20 overflow-hidden rounded-full bg-muted sm:w-28">
                      <span className="block h-full rounded-full bg-primary" style={{ width: `${item.share}%` }} />
                    </span>
                    <span className="w-8 text-right font-heading text-xs font-semibold text-foreground">{item.share}%</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-[0.68rem] text-muted-foreground">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={1.8} className="size-3.5 text-primary" />
              Drives in 20 more districts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImpactGallery() {
  return (
    <section className="py-4 sm:py-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-muted"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 24vw"
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent px-3 pb-3 pt-8 text-[0.65rem] font-medium text-background">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
