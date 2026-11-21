import Link from "next/link";
import {
  ArrowRight02Icon,
  GlobeIcon,
  HandHeartIcon,
  HeartIcon,
  IdeaIcon,
  Location01Icon,
  Shield01Icon,
  SnowIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";

const values = [
  {
    icon: HeartIcon,
    title: "Dignity in every hand",
    text: "We work with communities, not for them. Every drive is shaped around what people actually need.",
  },
  {
    icon: Shield01Icon,
    title: "Clear and accountable",
    text: "Every event names its creator and shares the details up front, so you know who is organising and where your time goes.",
  },
  {
    icon: Location01Icon,
    title: "Local by default",
    text: "Change starts on your own street. We keep discovery close to home so showing up feels realistic, not heroic.",
  },
];

const milestones = [
  {
    year: "2023",
    title: "A question over tea",
    text: "A few friends wanted to help during winter but had no idea where to start. That conversation became the first version of Sobar Haat.",
    icon: IdeaIcon,
  },
  {
    year: "2024",
    title: "The first winter drive",
    text: "Blankets and warm clothes reached families in Mirpur. A small group showed up — and stayed.",
    icon: SnowIcon,
  },
  {
    year: "2025",
    title: "Beyond one neighbourhood",
    text: "Organisers from new districts began creating their own drives, and the calendar grew month by month.",
    icon: GlobeIcon,
  },
  {
    year: "Today",
    title: "Locally led, always",
    text: "Hundreds of service drives later, the idea is unchanged: make it easy for good people to meet real needs.",
    icon: HandHeartIcon,
  },
];

export function AboutMission() {
  return (
    <section className="border-y border-border/60 bg-card/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Why we exist
          </Badge>
          <div className="relative mt-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 font-heading text-[8rem] leading-none text-coral/10"
            >
              &ldquo;
            </span>
            <p className="relative font-heading text-2xl leading-snug font-medium text-balance text-foreground sm:text-3xl">
              Good intentions are everywhere. What was missing was a simple way to
              turn them into helping hands.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
            Sobar Haat began with one everyday question: where can I help right now?
            Today it connects organisers with volunteers across the country — without
            the noise, confusion or guesswork.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="group h-full rounded-2xl border border-border/70 bg-background/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <HugeiconsIcon icon={value.icon} strokeWidth={1.8} className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-sm font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{value.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutTimeline() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-primary/20 bg-card/60 px-3 py-1 text-[0.65rem]"
            >
              <span className="size-1.5 rounded-full bg-coral" />
              Our journey
            </Badge>
            <h2 className="mt-4 font-heading text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
              From one winter drive to a growing network.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              A few moments that shaped the way we work — and the reason we keep the
              process simple enough for anyone to join.
            </p>
            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:underline"
            >
              See what is happening now
              <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-3.5" />
            </Link>
          </div>

          <ol className="relative space-y-5 border-l border-border/70 pl-6 sm:pl-8">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="relative">
                <span className="absolute -left-10 grid size-8 place-items-center rounded-full border border-border bg-card text-primary shadow-sm sm:-left-12">
                  <HugeiconsIcon icon={milestone.icon} strokeWidth={1.8} className="size-4" />
                </span>
                <div className="rounded-2xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/30">
                  <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-coral uppercase">
                    {milestone.year}
                  </span>
                  <h3 className="mt-1 font-heading text-base font-semibold text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{milestone.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
