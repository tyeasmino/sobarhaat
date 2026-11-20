export function EventsSkeleton() {
  return (
    <section className="py-16 sm:py-20" aria-busy="true" aria-label="Loading events">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-4 w-28 animate-pulse rounded-full bg-muted" />
        <div className="mt-4 h-8 w-72 max-w-full animate-pulse rounded-lg bg-muted" />
        <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded bg-muted/70" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border/70 bg-card/70"
            >
              <div className="aspect-[16/10] animate-pulse bg-muted" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted/70" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted/70" />
                <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
