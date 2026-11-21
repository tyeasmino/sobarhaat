import Link from "next/link";
import {
  Activity01Icon,
  ArrowRight02Icon,
  BloodIcon,
  Calendar03Icon,
  GroupIcon,
  HandHeartIcon,
  Location01Icon,
  RestaurantIcon,
  SnowIcon,
  Tree02Icon,
  UmbrellaIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: Calendar03Icon, value: "240+", label: "service drives" },
  { icon: GroupIcon, value: "12k+", label: "people supported" },
  { icon: Location01Icon, value: "24", label: "districts reached" },
  { icon: HandHeartIcon, value: "2.4k", label: "active volunteers" },
];

const causes = [
  {
    icon: SnowIcon,
    title: "Winter warmth",
    text: "Blankets, shawls and warm clothes for families who feel the cold first.",
  },
  {
    icon: RestaurantIcon,
    title: "Food support",
    text: "Grocery packs and hot meals put together with local partners.",
  },
  {
    icon: UmbrellaIcon,
    title: "Flood relief",
    text: "Essentials and steady support when monsoon waters rise.",
  },
  {
    icon: BloodIcon,
    title: "Blood donation",
    text: "Voluntary camps that make giving blood simple, safe and nearby.",
  },
  {
    icon: Tree02Icon,
    title: "Greener streets",
    text: "Saplings and clean-up drives that keep neighbourhoods healthy.",
  },
];

export function AboutImpact() {
  return (
    <section className="pb-4 sm:pb-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-10 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-16 size-64 rounded-full bg-mint/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -bottom-20 size-64 rounded-full bg-coral/15 blur-3xl"
          />

          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">
              <HugeiconsIcon icon={Activity01Icon} strokeWidth={1.8} className="size-4" />
              The difference, together
            </span>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Small acts, measured in real lives.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Behind every number is a neighbour, a family, a day that got a little easier.
            </p>
            <Link
              href="/impact"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:underline"
            >
              See the full impact picture
              <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-3.5" />
            </Link>
          </div>

          <div className="relative mt-9 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/60 bg-card/70 p-4 text-center backdrop-blur-sm sm:p-5"
              >
                <span className="mx-auto grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <HugeiconsIcon icon={stat.icon} strokeWidth={1.8} className="size-4" />
                </span>
                <p className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.68rem] text-muted-foreground sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutCauses() {
  return (
    <section className="border-t border-border/60 bg-card/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            What we show up for
          </Badge>
          <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            The causes close to our hearts.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            From the first cold week of winter to monsoon floods and blood camps —
            these are the needs our community keeps answering.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {causes.map((cause) => (
            <article
              key={cause.title}
              className="group flex gap-4 rounded-2xl border border-border/70 bg-background/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <HugeiconsIcon icon={cause.icon} strokeWidth={1.8} className="size-5" />
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{cause.title}</h3>
                <p className="mt-1.5 text-xs leading-6 text-muted-foreground">{cause.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
