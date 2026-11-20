"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight02Icon,
  CheckmarkCircle01Icon,
  GoogleIcon,
  HandHeartIcon,
  Mail01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useAuth } from "@/components/auth-provider";
import { Brand } from "@/components/brand";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AuthMode = "login" | "register";

const copy = {
  login: {
    eyebrow: "Welcome back",
    title: "Good to see you again.",
    text: "Log in to create drives, manage your events and keep showing up.",
    action: "Log in",
    switchText: "New to Sobar Haat?",
    switchLabel: "Create an account",
    switchHref: "/register",
  },
  register: {
    eyebrow: "Join the hands",
    title: "Start where you are.",
    text: "Make an account and turn one spare afternoon into real local change.",
    action: "Create account",
    switchText: "Already have an account?",
    switchLabel: "Log in",
    switchHref: "/login",
  },
};

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const content = copy[mode];

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const checks = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    length: password.length >= 6,
  };
  const passwordValid = checks.uppercase && checks.lowercase && checks.length;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (!passwordValid) {
      toast({
        variant: "error",
        title: "Check your password",
        description: "Use at least 6 characters with one uppercase and one lowercase letter.",
      });
      return;
    }

    const displayName =
      mode === "register"
        ? name.trim()
        : email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    signIn({
      name: displayName || "Volunteer",
      email,
      photoURL,
    });

    toast({
      variant: "success",
      title: mode === "login" ? "Welcome back!" : "Account created!",
      description: "You are signed in. Let us do some good together.",
    });
    router.push("/");
  }

  function handleGoogle() {
    toast({
      variant: "info",
      title: "Google sign-in",
      description: "This will connect to BetterAuth once the server is live.",
    });
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
              Every drive starts with one person who decides to show up.
            </p>
            <p className="mt-3 text-sm text-white/80">Be that person in your neighbourhood.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md rounded-2xl border-border/70 bg-card/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
          <div className="lg:hidden">
            <Brand />
          </div>
          <p className="mt-6 text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">
            {content.eyebrow}
          </p>
          <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
            {content.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{content.text}</p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4" noValidate>
            {mode === "register" ? (
              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-foreground">Full name</span>
                <span className="relative block">
                  <HugeiconsIcon
                    icon={UserIcon}
                    strokeWidth={1.6}
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    className="h-10 bg-background/60 pl-9 text-sm"
                  />
                </span>
              </label>
            ) : null}

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

            {mode === "register" ? (
              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-foreground">
                  Photo URL <span className="font-normal text-muted-foreground">(optional)</span>
                </span>
                <Input
                  type="url"
                  value={photoURL}
                  onChange={(event) => setPhotoURL(event.target.value)}
                  placeholder="https://..."
                  className="h-10 bg-background/60 text-sm"
                />
              </label>
            ) : null}

            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-foreground">Password</span>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
                className="h-10 bg-background/60 text-sm"
              />
            </label>

            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {[
                { label: "Uppercase letter", ok: checks.uppercase },
                { label: "Lowercase letter", ok: checks.lowercase },
                { label: "6+ characters", ok: checks.length },
              ].map((rule) => (
                <li
                  key={rule.label}
                  className={`flex items-center gap-1 text-[0.65rem] ${
                    rule.ok ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={1.8} className="size-3" />
                  {rule.label}
                </li>
              ))}
            </ul>

            {submitted && !passwordValid ? (
              <p className="text-xs text-destructive">
                Password needs an uppercase letter, a lowercase letter and at least 6 characters.
              </p>
            ) : null}

            <Button type="submit" className="h-11 w-full gap-2 rounded-full text-sm">
              {content.action}
              <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-4" />
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[0.65rem] text-muted-foreground uppercase">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogle}
            className="h-11 w-full gap-2 rounded-full bg-background/50 text-sm"
          >
            <HugeiconsIcon icon={GoogleIcon} strokeWidth={1.6} className="size-4" />
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {content.switchText}{" "}
            <Link href={content.switchHref} className="font-semibold text-primary hover:underline">
              {content.switchLabel}
            </Link>
          </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
