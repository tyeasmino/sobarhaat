"use client";

import {
  ArrowRight02Icon,
  CheckmarkCircle01Icon,
  GoogleIcon,
  HandHeartIcon,
  Mail01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Brand } from "@/components/brand";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

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
  const { toast } = useToast();
  const content = copy[mode];
  const isRegister = mode === "register";

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const checks = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    length: password.length >= 6,
  };
  const passwordValid = checks.uppercase && checks.lowercase && checks.length;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (!email.trim() || !password) {
      toast({
        variant: "error",
        title: "Missing details",
        description: "Enter both your email address and password.",
      });
      return;
    }

    if (isRegister && !name.trim()) {
      toast({
        variant: "error",
        title: "Missing details",
        description: "Tell us your name so neighbours know who they are meeting.",
      });
      return;
    }

    // Password rules are for registration. On login BetterAuth checks the
    // credentials against the stored account, so we only need a non-empty value.
    if (isRegister && !passwordValid) {
      toast({
        variant: "error",
        title: "Check your password",
        description: "Use at least 6 characters with one uppercase and one lowercase letter.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = isRegister
        ? await authClient.signUp.email({
            name: name.trim(),
            email: email.trim(),
            password,
            ...(photoURL.trim() ? { image: photoURL.trim() } : {}),
          })
        : await authClient.signIn.email({
            email: email.trim(),
            password,
          });

      if (error || !data) {
        toast({
          variant: "error",
          title: isRegister ? "Could not create account" : "Could not log in",
          description: error?.message ?? "Please check your details and try again.",
        });
        return;
      }

      toast({
        variant: "success",
        title: isRegister ? "Account created!" : "Welcome back!",
        description: "You are signed in. Let us do some good together.",
      });
      router.replace("/");
      router.refresh();
    } catch (cause) {
      toast({
        variant: "error",
        title: "Something went wrong",
        description: cause instanceof Error ? cause.message : "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogle() {
    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast({
          variant: "error",
          title: "Google sign-in failed",
          description: error.message ?? "Please try again in a moment.",
        });
      }
    } catch (cause) {
      toast({
        variant: "error",
        title: "Something went wrong",
        description: cause instanceof Error ? cause.message : "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border/70 bg-card/40 lg:grid-cols-2">
          <div className="relative hidden min-h-150 overflow-hidden bg-muted lg:block">
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
                {isRegister ? (
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-foreground">Full name</span>
                    <span className="relative block">
                      <HugeiconsIcon
                        icon={UserIcon}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        name="name"
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
                      name="email"
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

                {isRegister ? (
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-foreground">
                      Photo URL <span className="font-normal text-muted-foreground">(optional)</span>
                    </span>
                    <Input
                      name="photoURL"
                      type="url"
                      value={photoURL}
                      onChange={(event) => setPhotoURL(event.target.value)}
                      placeholder="https://..."
                      className="h-10 bg-background/60 text-sm"
                    />
                  </label>
                ) : null}

                <div className="grid gap-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor="auth-password" className="text-xs font-medium text-foreground">
                      Password
                    </label>
                    {mode === "login" ? (
                      <Link
                        href="/forgot-password"
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    ) : null}
                  </div>
                  <Input
                    id="auth-password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={isRegister ? "At least 6 characters" : "Your password"}
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    required
                    className="h-10 bg-background/60 text-sm"
                  />
                </div>

                {isRegister ? (
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {[
                      { label: "Uppercase letter", ok: checks.uppercase },
                      { label: "Lowercase letter", ok: checks.lowercase },
                      { label: "6+ characters", ok: checks.length },
                    ].map((rule) => (
                      <li
                        key={rule.label}
                        className={`flex items-center gap-1 text-[0.65rem] ${rule.ok ? "text-primary" : "text-muted-foreground"
                          }`}
                      >
                        <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={1.8} className="size-3" />
                        {rule.label}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {isRegister && submitted && !passwordValid ? (
                  <p className="text-xs text-destructive">
                    Password needs an uppercase letter, a lowercase letter and at least 6 characters.
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full gap-2 rounded-full text-sm"
                >
                  {isSubmitting ? "Please wait..." : content.action}
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
                disabled={isSubmitting}
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
