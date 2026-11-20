import {
  Calendar03Icon,
  GroupIcon,
  Shield01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Calendar03Icon,
    title: "Events near you",
    text: "Find drives by date, type and location so your spare time goes where it counts.",
  },
  {
    icon: GroupIcon,
    title: "Join with one tap",
    text: "See who is going, join the team and get everything you need before showtime.",
  },
  {
    icon: Shield01Icon,
    title: "Verified organisers",
    text: "Every event carries its creator, so you always know who is behind the work.",
  },
  {
    icon: SparklesIcon,
    title: "Your impact, visible",
    text: "Track the drives you joined and watch your footprint grow over time.",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-y border-border/60 bg-card/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Why Sobar Haat
          </Badge>
          <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Good intentions need a place to land.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            We handle the coordination so you can focus on the part that matters —
            showing up for your neighbourhood.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group h-full rounded-2xl border border-border/70 bg-background/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <HugeiconsIcon icon={feature.icon} strokeWidth={1.8} className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-sm font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
