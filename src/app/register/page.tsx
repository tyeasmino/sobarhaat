import type { Metadata } from "next";

import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Register — Sobar Haat",
  description: "Join Sobar Haat and start helping in your neighbourhood.",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
