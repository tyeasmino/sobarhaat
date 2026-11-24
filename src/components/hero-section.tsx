import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight02Icon,
  Calendar03Icon,
  GroupIcon,
  HandHeartIcon,
  HeartIcon,
  Location01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const causes = [
  "Winter clothes",
  "Blanket distribution",
  "Food support",
  "Flood relief",
  "Blood donation",
];

const impact = [
  { icon: HeartIcon, value: "240+", label: "service drives" },
  { icon: GroupIcon, value: "12k+", label: "people supported" },
  { icon: Location01Icon, value: "24", label: "districts reached" },
  { icon: Shield01Icon, value: "100%", label: "verified events" },
];

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-24 size-96 rounded-full bg-mint/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-28 size-96 rounded-full bg-coral/15 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-8">
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-primary/20 bg-card/60 px-3 py-1 text-[0.65rem] backdrop-blur-sm"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-coral" />
            </span>
            Community-powered · Dhaka &amp; beyond
          </Badge>

          <h1 className="mt-6 font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Hands together.{" "}
            <span className="relative inline-block text-primary">
              Real change.
              <svg
                aria-hidden="true"
                viewBox="0 0 260 12"
                fill="none"
                className="absolute -bottom-2 left-0 h-2.5 w-full text-coral/70"
              >
                <path
                  d="M3 8.5C55 2.5 152 1.5 257 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p id="about" className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Find local social-service drives — winter clothes, food support, flood
            relief, blood donation — and show up where it matters most. Sobar Haat
            turns good intentions into helping hands in your own neighbourhood.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              render={<Link href="/events" />}
              className="h-11 gap-2 rounded-full px-5 text-sm shadow-lg shadow-primary/20"
            >
              Explore upcoming events
              <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} />
            </Button>
            <Button
              variant="outline"
              render={<Link href="#how-it-works" />}
              className="h-11 gap-2 rounded-full bg-background/50 px-5 text-sm"
            >
              <HugeiconsIcon icon={HandHeartIcon} strokeWidth={1.8} />
              How it works
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-primary text-[0.6rem] font-bold text-primary-foreground">
                  AR
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-accent text-[0.6rem] font-bold text-accent-foreground">
                  SK
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-mint text-[0.6rem] font-bold text-foreground">
                  MH
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">2,400+ volunteers</p>
                <p className="text-[0.65rem] text-muted-foreground">ready to help nearby</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <HugeiconsIcon icon={HeartIcon} strokeWidth={1.6} className="size-4 text-coral" />
              <span className="text-xs font-semibold text-foreground">12k+ lives touched</span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[5/5] overflow-hidden rounded-[2rem] border border-border/60 bg-muted shadow-2xl shadow-primary/10 sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/sobar-haat-hero.svg"
              alt="Volunteers holding a blanket and a heart above a neighbourhood skyline"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,var(--hero-shade),transparent_65%)]"
            />

            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-border/40 bg-background/85 px-3 py-1.5 text-[0.65rem] font-medium text-foreground backdrop-blur-md">
              <HugeiconsIcon icon={Location01Icon} strokeWidth={1.8} className="size-3.5 text-primary" />
              Mirpur 10, Dhaka
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-border/40 bg-card/85 px-2.5 py-1.5 text-[0.65rem] font-medium text-foreground backdrop-blur-md">
              <HugeiconsIcon icon={Shield01Icon} strokeWidth={1.6} className="size-3.5 text-primary" />
              Verified drive
            </div>

            <div className="absolute right-3 bottom-4 left-3 sm:right-5 sm:bottom-6 sm:left-5">
              <Card className="rounded-2xl border-border/60 bg-card/90 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    <HugeiconsIcon icon={HandHeartIcon} strokeWidth={1.8} className="size-3.5" />
                    Next service drive
                  </span>
                  <Badge variant="secondary" className="rounded-full px-2 py-0.5">
                    Winter
                  </Badge>
                </div>

                <h2 className="mt-2 font-heading text-base font-semibold text-foreground">
                  Winter Clothes Distribution
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.68rem] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <HugeiconsIcon icon={Calendar03Icon} strokeWidth={1.6} className="size-3.5" />
                    Sat, 14 Dec · 10:00 AM
                  </span>
                  <span className="flex items-center gap-1">
                    <HugeiconsIcon icon={Location01Icon} strokeWidth={1.6} className="size-3.5" />
                    Mirpur 10
                  </span>
                </div>

                <Button
                  render={<Link href="/events" />}
                  className="mt-3 h-9 w-full gap-1.5 rounded-lg text-xs"
                >
                  View event details
                  <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-3.5" />
                </Button>
              </Card>
            </div>
          </div>

          <div className="animate-float-delayed absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border border-border/60 bg-card/95 px-3 py-2 shadow-xl backdrop-blur-md sm:flex">
            <span className="grid size-7 place-items-center rounded-lg bg-accent/15 text-accent">
              <HugeiconsIcon icon={GroupIcon} strokeWidth={1.8} className="size-3.5" />
            </span>
            <span>
              <span className="block text-[0.65rem] font-semibold text-foreground">48 volunteers</span>
              <span className="block text-[0.58rem] text-muted-foreground">already joined</span>
            </span>
          </div>
        </div>
      </div>

      <div id="events" className="mt-16 flex flex-wrap items-center justify-center gap-2 px-4 sm:px-6">
        <span className="text-[0.6rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          What you can do
        </span>
        {causes.map((cause) => (
          <span
            key={cause}
            className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[0.68rem] font-medium text-foreground/80 backdrop-blur-sm"
          >
            {cause}
          </span>
        ))}
      </div>

      <div
        id="impact"
        className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-2 gap-3 px-4 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        {impact.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3.5 backdrop-blur-sm transition-colors hover:border-primary/30"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <HugeiconsIcon icon={item.icon} strokeWidth={1.8} className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">{item.value}</span>
              <span className="block text-[0.65rem] text-muted-foreground">{item.label}</span>
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}
