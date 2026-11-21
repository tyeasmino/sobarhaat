import Link from "next/link";
import { ArrowRight02Icon, HandHeartIcon, SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AboutCta() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 px-6 py-12 text-center sm:px-10">
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
              The next drive is closer than you think.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Pick a cause you care about, join a team nearby, or start something in
              your own neighbourhood. It only takes one hand to begin.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                render={<Link href="/events" />}
                className="h-11 gap-2 rounded-full px-5 text-sm shadow-lg shadow-primary/20"
              >
                Explore upcoming events
                <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/create-event" />}
                className="h-11 gap-2 rounded-full bg-background/60 px-5 text-sm"
              >
                <HugeiconsIcon icon={HandHeartIcon} strokeWidth={1.8} />
                Organise a drive
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
