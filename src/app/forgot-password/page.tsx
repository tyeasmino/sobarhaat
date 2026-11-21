import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password — Sobar Haat",
  description: "Preview of the password recovery page for your Sobar Haat account.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
