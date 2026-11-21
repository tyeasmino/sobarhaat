import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight02Icon,
  GlobeIcon,
  GroupIcon,
  HandHeartIcon,
  HeartIcon,
  Location01Icon,
  QuoteIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const promises = [
  { icon: Location01Icon, label: "Rooted in local communities" },
  { icon: HeartIcon, label: "Built around real needs" },
  { icon: GroupIcon, label: "Open to everyone" },
];

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 size-[28rem] rounded-full bg-mint/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 -right-32 size-[26rem] rounded-full bg-coral/15 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-primary/20 bg-card/60 px-3 py-1 text-[0.65rem] backdrop-blur-sm"
          >
            <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.8} className="size-3.5 text-primary" />
            Our story · Sobar Haat
          </Badge>

          <h1 className="mt-6 font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Help should feel{" "}
            <span className="relative inline-block text-primary">
              close to home.
              <svg
                aria-hidden="true"
                viewBox="0 0 280 12"
                fill="none"
                className="absolute -bottom-2 left-0 h-2.5 w-full text-coral/70"
              >
                <path
                  d="M3 8.5C60 2.5 165 1.5 277 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Sobar Haat is a community-first platform for social-service events. We
            bring neighbours, organisers and local causes into one simple place — so
            a spare afternoon can become a blanket for someone, a hot meal, or a safe
            ride to a blood donation camp.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            No grand gestures required. Just people showing up for people, in the
            places they already live.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              render={<Link href="/events" />}
              className="h-11 gap-2 rounded-full px-5 text-sm shadow-lg shadow-primary/20"
            >
              Find a drive near you
              <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} />
            </Button>
            <Button
              variant="outline"
              render={<Link href="/register" />}
              className="h-11 gap-2 rounded-full bg-background/50 px-5 text-sm"
            >
              <HugeiconsIcon icon={HandHeartIcon} strokeWidth={1.8} />
              Join the movement
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/60 pt-6">
            {promises.map((promise) => (
              <span key={promise.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary">
                  <HugeiconsIcon icon={promise.icon} strokeWidth={1.8} className="size-3.5" />
                </span>
                {promise.label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/60 bg-muted shadow-2xl shadow-primary/10 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/sobar-haat-hero.svg"
              alt="Volunteers sharing blankets and support in a neighbourhood"
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
              Made in Bangladesh
            </div>

            <div className="absolute right-3 bottom-4 left-3 sm:right-5 sm:bottom-6 sm:left-5">
              <Card className="rounded-2xl border-border/60 bg-card/90 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
                <span className="flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  <HugeiconsIcon icon={QuoteIcon} strokeWidth={1.8} className="size-3.5 text-coral" />
                  What drives us
                </span>
                <p className="mt-2 font-heading text-base leading-6 font-medium text-balance text-foreground sm:text-lg">
                  &ldquo;No one should have to wait alone for help to arrive.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2 border-t border-border/60 pt-3">
                  <span className="grid size-7 place-items-center rounded-full bg-accent/15 text-accent">
                    <HugeiconsIcon icon={HeartIcon} strokeWidth={1.8} className="size-3.5" />
                  </span>
                  <span className="text-[0.68rem] text-muted-foreground">
                    The idea behind every Sobar Haat drive
                  </span>
                </div>
              </Card>
            </div>
          </div>

          <div className="animate-float absolute -top-4 -right-2 hidden items-center gap-2 rounded-xl border border-border/60 bg-card/95 px-3 py-2 shadow-xl backdrop-blur-md sm:flex">
            <span className="grid size-7 place-items-center rounded-lg bg-mint/30 text-primary">
              <HugeiconsIcon icon={GlobeIcon} strokeWidth={1.8} className="size-3.5" />
            </span>
            <span>
              <span className="block text-[0.65rem] font-semibold text-foreground">24 districts</span>
              <span className="block text-[0.58rem] text-muted-foreground">and growing</span>
            </span>
          </div>

          <div className="animate-float-delayed absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border border-border/60 bg-card/95 px-3 py-2 shadow-xl backdrop-blur-md sm:flex">
            <span className="grid size-7 place-items-center rounded-lg bg-accent/15 text-accent">
              <HugeiconsIcon icon={GroupIcon} strokeWidth={1.8} className="size-3.5" />
            </span>
            <span>
              <span className="block text-[0.65rem] font-semibold text-foreground">2,400+ volunteers</span>
              <span className="block text-[0.58rem] text-muted-foreground">ready to help nearby</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
