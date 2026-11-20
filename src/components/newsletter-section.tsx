"use client";

import * as React from "react";
import {
  ArrowRight02Icon,
  CheckmarkCircle01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-10 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-10 size-64 rounded-full bg-coral/15 blur-3xl"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">
                <HugeiconsIcon icon={Mail01Icon} strokeWidth={1.8} className="size-4" />
                The good news letter
              </span>
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Hear about the next drive first.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                A short monthly note with new events, volunteer stories and the
                difference your hands made. No noise.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              <Input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-11 w-full rounded-full border-border/70 bg-background px-4 text-sm sm:w-72"
              />
              <Button type="submit" className="h-11 gap-2 rounded-full px-5 text-sm">
                Subscribe
                <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-4" />
              </Button>
            </form>
          </div>

          {submitted ? (
            <p
              role="status"
              className="relative mt-4 flex items-center gap-2 text-xs font-medium text-primary"
            >
              <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={1.8} className="size-4" />
              You are on the list. We will write soon.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
