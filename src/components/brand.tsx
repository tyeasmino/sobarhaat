import { cn } from "cn";
import Image from "next/image";

type BrandProps = {
  className?: string;
  compact?: boolean;
};

export function Brand({ className, compact = false }: BrandProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/sobar-haat-logo.svg"
        alt=""
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-xl"
        priority
      />
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-base font-semibold tracking-tight text-foreground">
            Sobar <span className="text-primary">Haat</span>
          </span>
          <span className="mt-1 text-[0.58rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
            hands together
          </span>
        </span>
      ) : null}
    </span>
  );
}
