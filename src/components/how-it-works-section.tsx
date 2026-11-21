import {
  Calendar03Icon,
  ChevronDownIcon,
  HandHeartIcon,
  Location01Icon,
  Shield01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";

type Step = { number: string; title: string; text: string };

const volunteerSteps: Step[] = [
  {
    number: "01",
    title: "Find a drive",
    text: "Browse events by date and location. Winter clothes, food support, flood relief — pick the cause that speaks to you.",
  },
  {
    number: "02",
    title: "Join in one tap",
    text: "Sign up to see the full details, the organiser and who else is going. No forms, no waiting list.",
  },
  {
    number: "03",
    title: "Show up and help",
    text: "Meet the team at the venue, do the work that is needed and see your contribution in your joined events.",
  },
];

const organiserSteps: Step[] = [
  {
    number: "01",
    title: "Create your event",
    text: "Add a title, date, location and what you need. Your name and email stay on the event so people know who to trust.",
  },
  {
    number: "02",
    title: "Share with your community",
    text: "Publish it for neighbours to find. Word of mouth and a single link are usually all it takes to fill a team.",
  },
  {
    number: "03",
    title: "Manage with confidence",
    text: "Track who joined, update the details and keep full control — only you can edit or remove your own drive.",
  },
];

const faqs = [
  {
    question: "Do I need any experience to volunteer?",
    answer:
      "None at all. Every drive is guided by an organiser — just bring yourself and a little time.",
  },
  {
    question: "Does joining an event cost anything?",
    answer:
      "No. Sobar Haat is free to use. You only give your time and whatever the drive asks you to bring.",
  },
  {
    question: "How do I know an event is genuine?",
    answer:
      "Each event shows its creator and their contact email. Only the creator can edit or remove it, and every join is recorded against that event.",
  },
  {
    question: "Can I start a drive in my own area?",
    answer:
      "Absolutely. Create an event, add the date, location and what you need, then share it with your community.",
  },
];

function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative mt-7 space-y-6 before:absolute before:bottom-3 before:left-4 before:top-3 before:w-px before:bg-border/70">
      {steps.map((step) => (
        <li key={step.number} className="relative flex gap-4">
          <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-border bg-card font-heading text-[0.65rem] font-semibold text-coral">
            {step.number}
          </span>
          <div className="pt-0.5">
            <h4 className="font-heading text-sm font-semibold text-foreground">{step.title}</h4>
            <p className="mt-1.5 text-xs leading-6 text-muted-foreground">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Track({
  eyebrow,
  title,
  icon,
  steps,
  tone,
}: {
  eyebrow: string;
  title: string;
  icon: typeof HandHeartIcon;
  steps: Step[];
  tone: "primary" | "accent";
}) {
  const iconTone =
    tone === "primary"
      ? "bg-primary/10 text-primary"
      : "bg-accent/15 text-accent";

  return (
    <article className="h-full rounded-3xl border border-border/70 bg-background/70 p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span className={`grid size-11 place-items-center rounded-xl ${iconTone}`}>
          <HugeiconsIcon icon={icon} strokeWidth={1.8} className="size-5" />
        </span>
        <div>
          <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
        </div>
      </div>
      <StepList steps={steps} />
    </article>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-border/60 bg-card/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="gap-2 rounded-full px-3 py-1">
            <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.8} className="size-3.5" />
            How it works
          </Badge>
          <h2 className="mt-4 font-heading text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
            From &ldquo;I want to help&rdquo; to &ldquo;I showed up&rdquo;.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Three simple steps on each side. No paperwork, no guesswork — just a
            clear path between a local need and the people who can meet it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Track
            eyebrow="For volunteers"
            title="Lend a hand"
            icon={HandHeartIcon}
            steps={volunteerSteps}
            tone="primary"
          />
          <Track
            eyebrow="For organisers"
            title="Bring people together"
            icon={Calendar03Icon}
            steps={organiserSteps}
            tone="accent"
          />
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
              <HugeiconsIcon icon={Shield01Icon} strokeWidth={1.8} className="size-3.5" />
            </span>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Good to know before you begin
            </h3>
          </div>
          <div className="mt-4 space-y-2">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border/70 bg-background/70 px-4 py-3 transition-colors open:border-primary/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <HugeiconsIcon
                    icon={ChevronDownIcon}
                    strokeWidth={1.8}
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 max-w-2xl text-xs leading-6 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.68rem] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Location01Icon} strokeWidth={1.8} className="size-3.5 text-primary" />
            Rooted in local neighbourhoods
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Shield01Icon} strokeWidth={1.8} className="size-3.5 text-primary" />
            Named organisers on every drive
          </span>
        </div>
      </div>
    </section>
  );
}
