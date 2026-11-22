"use client";

import * as React from "react";
import {
  Calendar03Icon,
  Cancel01Icon,
  CleanIcon,
  FilterHorizontalIcon,
  GiftIcon,
  HealthIcon,
  LayoutGridIcon,
  RestaurantIcon,
  RotateClockwiseIcon,
  Search01Icon,
  SnowIcon,
  Tree02Icon,
  UmbrellaIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { EventCard } from "@/components/event-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upcomingOnly, useApiEvents, useToday } from "@/lib/event-store";
import { cn } from "@/lib/utils";

const categories = [
  { label: "All types", icon: LayoutGridIcon },
  { label: "Winter Support", icon: SnowIcon },
  { label: "Donation", icon: GiftIcon },
  { label: "Food Support", icon: RestaurantIcon },
  { label: "Flood Relief", icon: UmbrellaIcon },
  { label: "Health", icon: HealthIcon },
  { label: "Plantation", icon: Tree02Icon },
  { label: "Cleanup", icon: CleanIcon },
];

const ALL_TYPES = "All types";

export default function EventsPage() {
  const events = useApiEvents();
  const today = useToday();
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState(ALL_TYPES);

  const upcoming = React.useMemo(
    () => upcomingOnly(events, today).sort((a, b) => a.date.localeCompare(b.date)),
    [events, today]
  );

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    return upcoming.filter((event) => {
      const matchesType = type === ALL_TYPES || event.type === type;
      const haystack = `${event.title} ${event.location} ${event.description}`.toLowerCase();
      return matchesType && haystack.includes(needle);
    });
  }, [upcoming, query, type]);

  const hasFilters = query.trim() !== "" || type !== ALL_TYPES;

  function clearFilters() {
    setQuery("");
    setType(ALL_TYPES);
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            Open to everyone
          </Badge>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Upcoming events
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Every drive below needs a few more hands. Find one near you and join
            the team.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-border/70 bg-card/40 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <HugeiconsIcon
                icon={Search01Icon}
                strokeWidth={1.7}
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by event, cause or location"
                aria-label="Search events"
                className="h-11 rounded-full bg-background/70 pr-10 pl-10 text-sm"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={1.8} className="size-3.5" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary">
                <HugeiconsIcon icon={Calendar03Icon} strokeWidth={1.8} className="size-3.5" />
              </span>
              <span>
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
                <span className="font-semibold text-foreground">{upcoming.length}</span> upcoming drives
              </span>
            </div>
          </div>

          <div className="my-4 h-px bg-border/60" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={FilterHorizontalIcon} strokeWidth={1.8} className="size-4 text-primary" />
              <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">
                Browse by cause
              </span>
            </div>
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-primary transition-colors hover:underline"
              >
                <HugeiconsIcon icon={RotateClockwiseIcon} strokeWidth={1.8} className="size-3" />
                Clear filters
              </button>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = type === category.label;
              return (
                <button
                  key={category.label}
                  type="button"
                  onClick={() => setType(category.label)}
                  aria-pressed={active}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "border-border/70 bg-background/70 text-muted-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full transition-colors",
                      active
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    )}
                  >
                    <HugeiconsIcon icon={category.icon} strokeWidth={1.8} className="size-3.5" />
                  </span>
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={1.8} className="size-5" />
            </span>
            <p className="mt-4 font-heading text-base font-semibold text-foreground">
              No events match that search
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different cause or clear the filters to see every upcoming drive.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="mt-5 h-9 gap-2 rounded-full text-xs"
            >
              <HugeiconsIcon icon={RotateClockwiseIcon} strokeWidth={1.8} className="size-3.5" />
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
