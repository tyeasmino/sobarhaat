import {
  Facebook01Icon,
  GroupIcon,
  HeartIcon,
  InstagramIcon,
  Linkedin01Icon,
  XIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { Brand } from "@/components/brand";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "About Sobar Haat", href: "/about" },
      { label: "Upcoming events", href: "/events" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Our impact", href: "/impact" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Create an event", href: "/create-event" },
      { label: "Manage events", href: "/manage-events" },
      { label: "Joined events", href: "/joined-events" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Register", href: "/register" },
    ],
  },
];

const socials = [
  { icon: XIcon, label: "X" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: Facebook01Icon, label: "Facebook" },
  { icon: Linkedin01Icon, label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-card/50">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-sm text-xs leading-6 text-muted-foreground">
              Sobar Haat connects neighbours who want to help with the causes that
              need them. One event, one hand, one small change at a time.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#top"
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-full border border-border/70 bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <HugeiconsIcon icon={social.icon} strokeWidth={1.7} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-heading text-xs font-semibold tracking-wide text-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-6 text-[0.68rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Sobar Haat. Built for communities, not clicks.</p>
          <p className="flex items-center gap-2">
            <HugeiconsIcon icon={HeartIcon} strokeWidth={1.6} className="size-3.5 text-coral" />
            Made with care in Bangladesh
            <HugeiconsIcon icon={GroupIcon} strokeWidth={1.6} className="size-3.5 text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
}
