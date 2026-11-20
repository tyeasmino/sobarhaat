import type { Metadata } from "next";

import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Log in — Sobar Haat",
  description: "Log in to create, join and manage community service events.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
