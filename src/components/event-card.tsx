import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight02Icon,
  Calendar03Icon,
  GroupIcon,
  Location01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { formatEventDate, formatEventTime, type EventItem } from "@/lib/events";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-border/70 bg-card/70 p-0">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className="rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm">
            {event.type}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base leading-snug font-semibold text-foreground">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-4 grid gap-2 text-[0.7rem] text-muted-foreground">
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={Calendar03Icon} strokeWidth={1.6} className="size-3.5 text-primary" />
            {formatEventDate(event.date)} · {formatEventTime(event.time)}
          </span>
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={Location01Icon} strokeWidth={1.6} className="size-3.5 text-primary" />
            {event.location}
          </span>
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={GroupIcon} strokeWidth={1.6} className="size-3.5 text-primary" />
            {event.volunteers} volunteers joined
          </span>
        </div>

        <Button
          variant="outline"
          render={<Link href={`/events/${event.id}`} />}
          className="mt-auto h-9 w-full gap-1.5 rounded-lg text-xs"
        >
          View event
          <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={1.8} className="size-3.5" />
        </Button>
      </div>
    </Card>
  );
}
