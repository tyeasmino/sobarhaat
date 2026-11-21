import Link from "next/link";
import {
  Activity01Icon,
  ArrowRight02Icon,
  Calendar03Icon,
  GroupIcon,
  HeartIcon,
  Location01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ribbon = [
  { icon: Calendar03Icon, value: "240+", label: "service drives" },
  { icon: HeartIcon, value: "12k+", label: "people supported" },
  { icon: Location01Icon, value: "24", label: "districts reached" },
  { icon: GroupIcon, value: "2.4k", label: "active volunteers" },
];

export function ImpactHero() {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-14 sm:pt-20 sm:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 size-[30rem] rounded-full bg-mint/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 size-[26rem] rounded-full bg-coral/15 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-primary/20 bg-card/60 px-3 py-1 text-[0.65rem] backdrop-blur-sm"
          >
            <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.8} className="size-3.5 text-primary" />
            Our impact · in numbers
          </Badge>

          <h1 className="mt-6 font-heading text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Every hand leaves{" "}
            <span className="relative inline-block text-primary">
              a mark.
              <svg
                aria-hidden="true"
                viewBox="0 0 170 12"
                fill="none"
                className="absolute -bottom-2 left-0 h-2.5 w-full text-coral/70"
              >
                <path
                  d="M3 8.5C45 2.5 110 1.5 167 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            A blanket handed over, a grocery pack packed, a blood camp staffed —
            the numbers below are made of moments like these. This is what neighbours
            in Bangladesh have built together through Sobar Haat.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              render={<Link href="/events" />}
              className="h-11 gap-2 rounded-full px-5 text-sm shadow-lg shadow-primary/20"
            >
              Find a drive near you
              <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} />
            </Button>
            <Button
              variant="outline"
              render={<Link href="/about" />}
              className="h-11 gap-2 rounded-full bg-background/60 px-5 text-sm"
            >
              <HugeiconsIcon icon={HeartIcon} strokeWidth={1.8} />
              Why we do this
            </Button>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-primary/20 bg-card/70 p-2 shadow-xl shadow-primary/5 backdrop-blur-sm sm:p-3">
          <span className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {ribbon.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/60 bg-background/70 p-4 text-center sm:p-5"
              >
                <span className="mx-auto grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <HugeiconsIcon icon={item.icon} strokeWidth={1.8} className="size-4" />
                </span>
                <p className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-[0.68rem] text-muted-foreground sm:text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.68rem] text-muted-foreground">
          <HugeiconsIcon icon={Activity01Icon} strokeWidth={1.8} className="size-3.5 text-primary" />
          Figures reflect drives recorded across the platform to date.
        </p>
      </div>
    </section>
  );
}
