import Link from "next/link";
import {
  ArrowRight02Icon,
  CheckmarkCircle01Icon,
  EyeIcon,
  HandHeartIcon,
  HeartIcon,
  Mail01Icon,
  QuoteIcon,
  Shield01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const stories = [
  {
    quote:
      "I signed up on a Sunday morning and by Friday I was handing out blankets in Mirpur. It was the first time helping felt this easy.",
    name: "Shamima A.",
    role: "Volunteer · Mirpur",
    initials: "SA",
  },
  {
    quote:
      "We needed twenty people for a food pack drive. I posted the event and the team filled itself. The details stayed with the event, so nobody was left guessing.",
    name: "Rakib H.",
    role: "Organiser · Sylhet",
    initials: "RH",
  },
  {
    quote:
      "The blood camp was my first drive. Seeing the list of people who joined made it real — these were neighbours, not names on a poster.",
    name: "Nusrat J.",
    role: "Volunteer · Chattogram",
    initials: "NJ",
  },
];

const promises = [
  {
    icon: Mail01Icon,
    title: "Named organisers",
    text: "Every event carries the creator's name and email, so you always know who is behind the work.",
  },
  {
    icon: CheckmarkCircle01Icon,
    title: "Real joins, recorded",
    text: "Each sign-up is stored against the event and the volunteer who made it.",
  },
  {
    icon: Shield01Icon,
    title: "Owner-only controls",
    text: "Only the creator can edit or remove a drive they put together.",
  },
  {
    icon: EyeIcon,
    title: "Clear event details",
    text: "Date, location, cause and what is needed are listed up front for everyone to see.",
  },
];

export function ImpactStories() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            In their words
          </Badge>
          <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            The numbers have names behind them.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            A few notes from people who turned an afternoon into something useful.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <Card
              key={story.name}
              className="flex h-full flex-col rounded-2xl border-border/70 bg-card/70 p-5 sm:p-6"
            >
              <HugeiconsIcon icon={QuoteIcon} strokeWidth={1.6} className="size-6 text-coral/60" />
              <p className="mt-3 flex-1 text-sm leading-7 text-foreground">{story.quote}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-[0.65rem] font-bold text-primary">
                  {story.initials}
                </span>
                <span>
                  <span className="block text-xs font-semibold text-foreground">{story.name}</span>
                  <span className="block text-[0.65rem] text-muted-foreground">{story.role}</span>
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ImpactTransparency() {
  return (
    <section className="border-y border-border/60 bg-card/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-primary/20 bg-card/60 px-3 py-1 text-[0.65rem]"
            >
              <span className="size-1.5 rounded-full bg-coral" />
              How we keep it honest
            </Badge>
            <h2 className="mt-4 font-heading text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
              Trust is part of the work.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              Small, practical rules keep every drive accountable — for the person
              organising it and for the person showing up.
            </p>
            <Link
              href="/#how-it-works"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:underline"
            >
              See how it works
              <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-3.5" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {promises.map((promise) => (
              <div
                key={promise.title}
                className="rounded-2xl border border-border/70 bg-background/70 p-5 transition-colors hover:border-primary/30"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <HugeiconsIcon icon={promise.icon} strokeWidth={1.8} className="size-4" />
                </span>
                <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">
                  {promise.title}
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-muted-foreground">{promise.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImpactCta() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-12 text-center sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-16 size-72 rounded-full bg-mint/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full bg-coral/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-primary/20 bg-background/70 px-3 py-1 text-[0.65rem]"
            >
              <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.8} className="size-3.5 text-primary" />
              Ready when you are
            </Badge>
            <h2 className="mt-5 font-heading text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
              Be the next number on this page.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Pick a cause, join a nearby team, or start a drive in your own
              neighbourhood. Every hand changes the count a little.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                render={<Link href="/events" />}
                className="h-11 gap-2 rounded-full px-5 text-sm shadow-lg shadow-primary/20"
              >
                Find a drive
                <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/create-event" />}
                className="h-11 gap-2 rounded-full bg-background/60 px-5 text-sm"
              >
                <HugeiconsIcon icon={HandHeartIcon} strokeWidth={1.8} />
                Start a drive
              </Button>
            </div>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-[0.68rem] text-muted-foreground">
              <HugeiconsIcon icon={HeartIcon} strokeWidth={1.8} className="size-3.5 text-coral" />
              Free to join · Open to everyone
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
