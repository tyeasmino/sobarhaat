export type EventItem = {
  id: string;
  title: string;
  type: string;
  location: string;
  date: string;
  time: string;
  thumbnail: string;
  description: string;
  volunteers: number;
  creatorEmail?: string;
};

export const sampleEvents: EventItem[] = [
  {
    id: "winter-clothes-mirpur",
    title: "Winter Clothes Distribution",
    type: "Winter Support",
    location: "Mirpur 10, Dhaka",
    date: "2026-12-14",
    time: "10:00 AM",
    thumbnail: "/events/winter-clothes.svg",
    description: "Warm jackets and sweaters for families in the Mirpur neighbourhood.",
    volunteers: 48,
  },
  {
    id: "blanket-mohammadpur",
    title: "Blanket Distribution for the Needy",
    type: "Donation",
    location: "Mohammadpur, Dhaka",
    date: "2026-12-21",
    time: "09:30 AM",
    thumbnail: "/events/blanket.svg",
    description: "A blanket each for elderly residents and street families.",
    volunteers: 32,
  },
  {
    id: "food-drive-kamalapur",
    title: "Community Food Drive",
    type: "Food Support",
    location: "Kamalapur, Dhaka",
    date: "2027-01-05",
    time: "04:00 PM",
    thumbnail: "/events/food.svg",
    description: "Hot meals and grocery packs prepared by local volunteers.",
    volunteers: 64,
  },
  {
    id: "flood-relief-keraniganj",
    title: "Flood Relief & Hygiene Kits",
    type: "Flood Relief",
    location: "Keraniganj, Dhaka",
    date: "2027-01-18",
    time: "08:00 AM",
    thumbnail: "/events/flood-relief.svg",
    description: "Dry food, safe drinking water and hygiene essentials for riverbank homes.",
    volunteers: 57,
  },
  {
    id: "blood-donation-farmgate",
    title: "Blood Donation Camp",
    type: "Health",
    location: "Farmgate, Dhaka",
    date: "2027-02-02",
    time: "10:00 AM",
    thumbnail: "/events/blood-donation.svg",
    description: "Voluntary blood collection with a local hospital team on site.",
    volunteers: 89,
  },
  {
    id: "tree-plantation-savar",
    title: "Winter Tree Plantation",
    type: "Plantation",
    location: "Savar, Dhaka",
    date: "2027-02-14",
    time: "07:30 AM",
    thumbnail: "/events/plantation.svg",
    description: "Saplings and care kits for a greener neighbourhood edge.",
    volunteers: 41,
  },
];

function normalizeEvent(raw: Record<string, unknown>, index: number): EventItem {
  const fallback = sampleEvents[index] ?? sampleEvents[0];
  return {
    id: String(raw.id ?? raw._id ?? fallback.id),
    title: String(raw.title ?? fallback.title),
    type: String(raw.type ?? fallback.type),
    location: String(raw.location ?? fallback.location),
    date: String(raw.date ?? fallback.date).slice(0, 10),
    time: String(raw.time ?? fallback.time),
    thumbnail: String(raw.thumbnail ?? raw.thumbnailImageUrl ?? fallback.thumbnail),
    description: String(raw.description ?? fallback.description),
    volunteers: Number(raw.volunteerCount ?? raw.volunteers ?? fallback.volunteers),
  };
}

export async function getRecentEvents(): Promise<EventItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) return sampleEvents;

  try {
    const response = await fetch(`${apiUrl}/events/recent?limit=6`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    });

    if (!response.ok) return sampleEvents;

    const payload: unknown = await response.json();
    const list = Array.isArray(payload)
      ? payload
      : (payload as { events?: unknown[] })?.events;

    if (!Array.isArray(list) || list.length === 0) return sampleEvents;

    return list.slice(0, 6).map((item, index) =>
      normalizeEvent(item as Record<string, unknown>, index)
    );
  } catch {
    return sampleEvents;
  }
}

export function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

// Stored times stay canonical 24-hour "HH:MM"; show them as 12-hour AM/PM.
export function formatEventTime(time: string) {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return time;

  const hours = Number(match[1]);
  const minutes = match[2];
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes} ${period}`;
}

// Accepts "10:30 AM", "10:30am", "9 AM" etc. and returns canonical "HH:MM".
export function parseEventTime(value: string) {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  if (hours < 1 || hours > 12 || minutes > 59) return null;

  const hour24 = (hours % 12) + (match[3].toLowerCase() === "pm" ? 12 : 0);
  return `${String(hour24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
