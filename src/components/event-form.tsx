"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight02Icon, Calendar03Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import type { EventItem } from "@/lib/events";
import { createEvent, updateEvent, useToday } from "@/lib/event-store";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Winter Support",
  "Food Support",
  "Flood Relief",
  "Health",
];

const defaultThumbnail = "/events/winter-clothes.svg";

type FormValues = {
  title: string;
  type: string;
  location: string;
  date: string;
  time: string;
  thumbnail: string;
  description: string;
};

export function EventForm({ initial }: { initial?: EventItem }) {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const today = useToday();

  const [values, setValues] = React.useState<FormValues>({
    title: initial?.title ?? "",
    type: initial?.type ?? "Cleanup",
    location: initial?.location ?? "",
    date: initial?.date ?? "",
    time: initial?.time ?? "10:00",
    thumbnail: initial?.thumbnail ?? defaultThumbnail,
    description: initial?.description ?? "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (values.title.trim().length < 5) next.title = "Give your event a clear title (5+ characters).";
    if (!values.type) next.type = "Pick an event type.";
    if (values.location.trim().length < 3) next.location = "Add a location (3+ characters).";
    if (!values.date) next.date = "Choose an event date.";
    else if (values.date < today) next.date = "The event date must be in the future.";
    if (!values.time) next.time = "Add a start time.";
    if (values.thumbnail.trim() && !/^https?:\/\/|^\//.test(values.thumbnail.trim())) {
      next.thumbnail = "Use a valid image URL starting with http(s):// or /.";
    }
    if (values.description.trim().length < 20) {
      next.description = "Write a short description (20+ characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    if (!validate()) {
      toast({
        variant: "error",
        title: "Check the form",
        description: "Some fields need attention before you can continue.",
      });
      return;
    }

    const payload: EventItem = {
      id: initial?.id ?? `event-${Date.now()}`,
      title: values.title.trim(),
      type: values.type,
      location: values.location.trim(),
      date: values.date,
      time: values.time,
      thumbnail: values.thumbnail.trim() || defaultThumbnail,
      description: values.description.trim(),
      volunteers: initial?.volunteers ?? 0,
      creatorEmail: user.email,
    };

    if (initial) {
      updateEvent(payload);
      toast({ variant: "success", title: "Event updated", description: "Your changes are saved." });
      router.push("/manage-events");
    } else {
      createEvent(payload);
      toast({
        variant: "success",
        title: "Event created!",
        description: "It is now listed under Upcoming Events.",
      });
      router.push("/events");
    }
  }

  const fieldClass = "h-10 bg-background/60 text-sm";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <Card className="grid gap-5 rounded-2xl border-border/70 bg-card/70 p-5 sm:p-6">
        <label className="grid gap-1.5">
          <span className="text-xs font-medium text-foreground">Event title</span>
          <Input
            value={values.title}
            onChange={(event) => set("title", event.target.value)}
            placeholder="Winter Clothes Distribution"
            className={fieldClass}
          />
          {errors.title ? <span className="text-xs text-destructive">{errors.title}</span> : null}
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="text-xs font-medium text-foreground">Event type</span>
            <NativeSelect
              value={values.type}
              onChange={(event) => set("type", event.target.value)}
              className={`${fieldClass} w-full`}
            >
              {eventTypes.map((type) => (
                <NativeSelectOption key={type} value={type}>
                  {type}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {errors.type ? <span className="text-xs text-destructive">{errors.type}</span> : null}
          </label>

          <label className="grid gap-1.5">
            <span className="text-xs font-medium text-foreground">Location</span>
            <span className="relative block">
              <HugeiconsIcon
                icon={Location01Icon}
                strokeWidth={1.6}
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={values.location}
                onChange={(event) => set("location", event.target.value)}
                placeholder="Mirpur 10, Dhaka"
                className={`${fieldClass} pl-9`}
              />
            </span>
            {errors.location ? <span className="text-xs text-destructive">{errors.location}</span> : null}
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className="text-xs font-medium text-foreground">Event date</span>
            <span className="relative block">
              <HugeiconsIcon
                icon={Calendar03Icon}
                strokeWidth={1.6}
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="date"
                min={today}
                value={values.date}
                onChange={(event) => set("date", event.target.value)}
                className={`${fieldClass} pl-9`}
              />
            </span>
            {errors.date ? <span className="text-xs text-destructive">{errors.date}</span> : null}
          </label>

          <label className="grid gap-1.5">
            <span className="text-xs font-medium text-foreground">Start time</span>
            <Input
              type="time"
              value={values.time}
              onChange={(event) => set("time", event.target.value)}
              className={fieldClass}
            />
            {errors.time ? <span className="text-xs text-destructive">{errors.time}</span> : null}
          </label>
        </div>

        <label className="grid gap-1.5">
          <span className="text-xs font-medium text-foreground">Thumbnail image URL</span>
          <Input
            value={values.thumbnail}
            onChange={(event) => set("thumbnail", event.target.value)}
            placeholder="https://example.com/photo.jpg"
            className={fieldClass}
          />
          {errors.thumbnail ? (
            <span className="text-xs text-destructive">{errors.thumbnail}</span>
          ) : (
            <span className="text-[0.65rem] text-muted-foreground">
              Leave the default to use a ready-made cause illustration.
            </span>
          )}
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-medium text-foreground">Description</span>
          <Textarea
            value={values.description}
            onChange={(event) => set("description", event.target.value)}
            placeholder="What will volunteers do, and who will it help?"
            rows={5}
            className="min-h-28 bg-background/60 text-sm"
          />
          {errors.description ? (
            <span className="text-xs text-destructive">{errors.description}</span>
          ) : null}
        </label>
      </Card>

      <Button type="submit" className="h-11 w-full gap-2 rounded-full text-sm sm:w-auto sm:px-8">
        {initial ? "Save changes" : "Create event"}
        <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-4" />
      </Button>
    </form>
  );
}
