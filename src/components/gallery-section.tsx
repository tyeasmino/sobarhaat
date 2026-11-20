import Image from "next/image";

import { Badge } from "@/components/ui/badge";

const photos = [
  { src: "/gallery/blanket-handover.svg", alt: "A volunteer handing a blanket to a neighbour" },
  { src: "/gallery/food-drive.svg", alt: "Volunteers packing grocery packs for a food drive" },
  { src: "/gallery/plantation.svg", alt: "Community members planting a sapling together" },
  { src: "/gallery/blood-camp.svg", alt: "A voluntary blood donation camp in the neighbourhood" },
];

export function GallerySection() {
  return (
    <section className="border-y border-border/60 bg-card/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            From the field
          </Badge>
          <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Moments that matter
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            A few frames from drives where neighbours showed up for neighbours.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-muted"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 24vw"
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
