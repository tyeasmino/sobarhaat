"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft01Icon,
  ArrowRight02Icon,
  ConstructionIcon,
  HandHeartIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border/70 bg-card/40 lg:grid-cols-2">
          <div className="relative hidden min-h-[600px] overflow-hidden bg-muted lg:block">
            <Image
              src="/sobar-haat-hero.svg"
              alt="Neighbours joining hands for a community drive"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,var(--hero-shade),transparent_75%)]"
            />
            <div className="relative flex h-full flex-col justify-between p-10">
              <Brand />
              <div className="max-w-md">
                <HugeiconsIcon icon={HandHeartIcon} strokeWidth={1.5} className="size-8 text-mint" />
                <p className="mt-4 font-heading text-2xl leading-snug font-semibold text-white">
                  Your account is a small part of something much bigger.
                </p>
                <p className="mt-3 text-sm text-white/80">
                  Let us get you back to the good work in your neighbourhood.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10">
            <Card className="w-full max-w-md rounded-2xl border-border/70 bg-card/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <div className="lg:hidden">
                <Brand />
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-coral/30 bg-coral/10 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-accent uppercase">
                <HugeiconsIcon icon={ConstructionIcon} strokeWidth={1.8} className="size-3.5" />
                Coming soon
              </span>

              <p className="mt-4 text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">
                Account recovery
              </p>
              <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                Forgot your password?
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Enter the email you use with Sobar Haat and we will send you a link to choose a new
                password.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4" noValidate>
                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-foreground">Email address</span>
                  <span className="relative block">
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      strokeWidth={1.6}
                      className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="h-10 bg-background/60 pl-9 text-sm"
                    />
                  </span>
                </label>

                <Tooltip>
                  <TooltipTrigger render={<span className="inline-flex w-full cursor-not-allowed" />}>
                    <Button
                      type="submit"
                      disabled
                      className="h-11 w-full gap-2 rounded-full text-sm disabled:opacity-100 disabled:bg-muted disabled:text-muted-foreground"
                    >
                      Send reset link
                      <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <HugeiconsIcon icon={ConstructionIcon} strokeWidth={1.8} className="size-3.5" />
                    Currently unavailable — under construction
                  </TooltipContent>
                </Tooltip>
              </form>

              <p className="mt-4 rounded-xl border border-border/70 bg-muted/50 px-3.5 py-3 text-xs leading-5 text-muted-foreground">
                Password reset is not live yet. This page is a preview of what is coming soon.
              </p>

              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={1.8} className="size-3.5" />
                Back to log in
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
