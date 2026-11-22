"use client";

import {
  ArrowRight02Icon,
  Calendar03Icon,
  Clock01Icon,
  CookingPotIcon,
  GiftIcon,
  HeartPulseIcon,
  Location01Icon,
  Plant01Icon,
  Recycle01Icon,
  SnowflakeIcon,
  UmbrellaIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "cn";
import { useRouter } from "next/navigation";
import * as React from "react";

import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createEvent, updateEvent, useToday } from "@/lib/event-store";
import {
  formatEventDate,
  formatEventTime,
  parseEventTime,
  type EventItem,
} from "@/lib/events";

const eventTypes = [
  { value: "Cleanup", icon: Recycle01Icon, hint: "Keep our neighbourhoods clean" },
  { value: "Plantation", icon: Plant01Icon, hint: "Grow something green together" },
  { value: "Donation", icon: GiftIcon, hint: "Share what you have" },
  { value: "Winter Support", icon: SnowflakeIcon, hint: "Warmth for those who need it" },
  { value: "Food Support", icon: CookingPotIcon, hint: "A meal for a neighbour" },
  { value: "Flood Relief", icon: UmbrellaIcon, hint: "Stand beside affected families" },
  { value: "Health", icon: HeartPulseIcon, hint: "Care, camps and check-ups" },
];

const timeSlots = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

function toDateInputValue(day: Date) {
  const month = String(day.getMonth() + 1).padStart(2, "0");
  const date = String(day.getDate()).padStart(2, "0");
  return `${day.getFullYear()}-${month}-${date}`;
}

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

function makeInitialValues(initial?: EventItem): FormValues {
  return {
    title: initial?.title ?? "",
    type: initial?.type ?? "Cleanup",
    location: initial?.location ?? "",
    date: initial?.date ?? "",
    time: initial?.time ?? "10:00",
    thumbnail: initial?.thumbnail ?? defaultThumbnail,
    description: initial?.description ?? "",
  };
}

export function EventForm({ initial }: { initial?: EventItem }) {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const today = useToday();

  const [values, setValues] = React.useState<FormValues>(() => makeInitialValues(initial));
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [dateOpen, setDateOpen] = React.useState(false);
  const [timeOpen, setTimeOpen] = React.useState(false);
  const [timeDraft, setTimeDraft] = React.useState(() => formatEventTime(values.time));
  const [isSaving, setIsSaving] = React.useState(false);

  const selectedType = eventTypes.find((type) => type.value === values.type) ?? eventTypes[0];

  // `useToday()` gives a stable server snapshot during hydration; the calendar
  // is only mounted in a popover after the client has the real date.
  const minDate = React.useMemo(() => new Date(`${today}T00:00:00`), [today]);
  const selectedDate = values.date ? new Date(`${values.date}T00:00:00`) : undefined;

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  // App Router cache-e component ta thakle new event create korar por abar
  // purono state fire ase — tai success-er sathe-i form-ta clear kore debo.
  function resetForm() {
    setValues(makeInitialValues(initial));
    setErrors({});
    setDateOpen(false);
    setTimeOpen(false);
    setTimeDraft(formatEventTime(initial?.time ?? "10:00"));
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || isSaving) return;
    if (!validate()) {
      toast({
        variant: "error",
        title: "Check the form",
        description: "Some fields need attention before you can continue.",
      });
      return;
    }

    // Sir-er pattern: sob dorkari data ekta object-e niye JSON body hisabe pathai.
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
      createdAt: initial?.createdAt ?? today,
    };

    setIsSaving(true);

    try {
      let saved = payload;

      if (!initial) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          toast({
            variant: "error",
            title: "Backend is not configured",
            description: "Add NEXT_PUBLIC_API_URL=http://localhost:8000 to .env and restart the dev server.",
          });
          return;
        }

        const response = await fetch(`${apiUrl}/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}. Is the Express server running?`);
        }

        // Mongo insertOne returns { acknowledged, insertedId }.
        const result = (await response.json()) as { insertedId?: string };
        saved = { ...payload, id: result.insertedId ?? payload.id };
      }

      if (initial) {
        updateEvent(saved);
        toast({ variant: "success", title: "Event updated", description: "Your changes are saved." });
        router.push("/manage-events");
      } else {
        // Local cache ta tai porjonto rakhi jate list page-e event-ta immediately dekha jay;
        // poribar GET /events connect korlei eta server theke asbe.
        createEvent(saved);
        resetForm();
        toast({
          variant: "success",
          title: "Event created!",
          description: "Saved and listed under Upcoming Events.",
        });
        router.push("/events");
      }
    } catch (cause) {
      toast({
        variant: "error",
        title: "Could not save the event",
        description: cause instanceof Error ? cause.message : "Please try again in a moment.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  const fieldClass = "h-10 bg-background/60 text-sm";
  // Same box model as the title/location Inputs (h-10, rounded-md, border-input, px-2).
  const pickerTriggerClass =
    "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background/60 px-2 text-sm text-foreground transition-colors outline-none hover:border-primary/40 hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 data-[size=default]:h-10 data-popup-open:border-primary data-popup-open:bg-primary/5";

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
          <div className="grid gap-1.5">
            <span className="text-xs font-medium text-foreground">Event type</span>
            <Select
              value={values.type}
              onValueChange={(value) => {
                if (value) set("type", value);
              }}
            >
              <SelectTrigger className={pickerTriggerClass}>
                <span className="flex items-center gap-2.5">
                  <HugeiconsIcon
                    icon={selectedType.icon}
                    strokeWidth={1.8}
                    className="size-4 text-primary"
                  />
                  <SelectValue>{selectedType.value}</SelectValue>
                </span>
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-border/70 bg-popover p-1.5 shadow-xl">
                {eventTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="gap-2.5 rounded-lg py-2 pr-9 pl-2.5 text-sm"
                  >
                    <HugeiconsIcon
                      icon={type.icon}
                      strokeWidth={1.8}
                      className="size-4 shrink-0 text-primary"
                    />
                    <span className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground">{type.value}</span>
                      <span className="text-[0.65rem] leading-4 text-muted-foreground">
                        {type.hint}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type ? <span className="text-xs text-destructive">{errors.type}</span> : null}
          </div>

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
          <div className="grid content-start gap-1.5">
            <span className="text-xs font-medium text-foreground">Event date</span>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger className={pickerTriggerClass}>
                <span className={cn("truncate", !values.date && "text-muted-foreground")}>
                  {values.date ? formatEventDate(values.date) : "Choose a date"}
                </span>
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  strokeWidth={1.8}
                  className="size-4 shrink-0 text-primary"
                />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-auto rounded-xl border border-border/70 bg-popover p-3 shadow-xl"
              >
                <div className="grid gap-1">
                  <PopoverTitle className="text-sm font-semibold text-foreground">
                    Pick an event date
                  </PopoverTitle>
                  <PopoverDescription className="text-xs text-muted-foreground">
                    Today and future dates only
                  </PopoverDescription>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(day) => {
                    if (!day) return;
                    set("date", toDateInputValue(day));
                    setDateOpen(false);
                  }}
                  disabled={{ before: minDate }}
                  defaultMonth={selectedDate ?? minDate}
                  className="rounded-lg"
                />
              </PopoverContent>
            </Popover>
            {errors.date ? (
              <span className="text-xs text-destructive">{errors.date}</span>
            ) : (
              <span className="text-[0.65rem] text-muted-foreground">
                Must be today or later.
              </span>
            )}
          </div>

          <div className="grid content-start gap-1.5">
            <span className="text-xs font-medium text-foreground">Start time</span>
            <Popover
              open={timeOpen}
              onOpenChange={(open) => {
                if (open) setTimeDraft(formatEventTime(values.time));
                setTimeOpen(open);
              }}
            >
              <PopoverTrigger className={pickerTriggerClass}>
                <span className={cn("truncate", !values.time && "text-muted-foreground")}>
                  {values.time ? formatEventTime(values.time) : "Choose a time"}
                </span>
                <HugeiconsIcon
                  icon={Clock01Icon}
                  strokeWidth={1.8}
                  className="size-4 shrink-0 text-primary"
                />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-72 rounded-xl border border-border/70 bg-popover p-3 shadow-xl"
              >
                <div className="grid gap-1">
                  <PopoverTitle className="text-sm font-semibold text-foreground">
                    When does it start?
                  </PopoverTitle>
                  <PopoverDescription className="text-xs text-muted-foreground">
                    Pick a quick slot or set an exact time.
                  </PopoverDescription>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        set("time", slot);
                        setTimeOpen(false);
                      }}
                      className={cn(
                        "h-9 rounded-lg border text-xs font-medium transition-colors",
                        values.time === slot
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/70 bg-background/60 text-foreground hover:border-primary/40 hover:bg-primary/5"
                      )}
                    >
                      {formatEventTime(slot)}
                    </button>
                  ))}
                </div>
                <label className="grid gap-1.5 border-t border-border/70 pt-3">
                  <span className="text-[0.65rem] font-medium tracking-wider text-muted-foreground uppercase">
                    Exact time
                  </span>
                  <Input
                    value={timeDraft}
                    onChange={(event) => {
                      const next = event.target.value;
                      setTimeDraft(next);
                      const parsed = parseEventTime(next);
                      if (parsed) set("time", parsed);
                    }}
                    placeholder="e.g. 10:30 AM"
                    className="h-10 bg-background/60 text-sm"
                  />
                  <span className="text-[0.65rem] text-muted-foreground">
                    Use AM or PM, for example 7:30 AM or 2:15 PM.
                  </span>
                </label>
              </PopoverContent>
            </Popover>
            {errors.time ? (
              <span className="text-xs text-destructive">{errors.time}</span>
            ) : (
              <span className="text-[0.65rem] text-muted-foreground">
                Pick a slot or type an exact time.
              </span>
            )}
          </div>
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

      <Button
        type="submit"
        disabled={isSaving}
        className="h-11 w-full gap-2 rounded-full text-sm sm:w-auto sm:px-8"
      >
        {isSaving ? "Saving..." : initial ? "Save changes" : "Create event"}
        <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-4" />
      </Button>
    </form>
  );
}
