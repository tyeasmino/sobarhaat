"use client";

import * as React from "react";
import Link from "next/link";
import { LockIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useAuth } from "@/components/auth-provider";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="grid min-h-[calc(100vh-8rem)] place-items-center px-4">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="grid min-h-[calc(100vh-8rem)] place-items-center px-4 py-12">
        <Card className="w-full max-w-md rounded-2xl border-border/70 bg-card/80 p-8 text-center shadow-xl">
          <Brand className="justify-center" />
          <span className="mx-auto mt-6 grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
            <HugeiconsIcon icon={LockIcon} strokeWidth={1.8} className="size-5" />
          </span>
          <h1 className="mt-4 font-heading text-xl font-semibold text-foreground">
            This page needs an account
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Log in to create, manage and track your community service events.
          </p>
          <Button render={<Link href="/login" />} className="mt-6 h-10 w-full rounded-full text-sm">
            Go to log in
          </Button>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
