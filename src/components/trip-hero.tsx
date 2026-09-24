import { MapPin } from "lucide-react";
import Image from "next/image";

export function TripHero() {
  return (
    <section
      className="grid items-center gap-8 pt-10 pb-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:pt-14 md:pb-14"
      aria-label="Raleigh pediatric boards trip"
    >
      <div>
        <p className="eyebrow">
          <MapPin size={14} aria-hidden="true" />
          Raleigh, NC · Oct 2–6, 2026
        </p>
        <h1 className="type-display mt-5">
          Little patients.
          <br />
          <span className="text-pine">Big milestone.</span>
        </h1>
        <p className="type-lead mt-6 max-w-[26rem]">
          Your pediatric dental boards weekend in Raleigh—with space to prepare, explore, and
          celebrate.
        </p>
      </div>
      <figure className="relative -mx-5 sm:mx-0">
        <div className="relative aspect-[5/2]">
          <Image
            className="object-cover [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent),linear-gradient(to_bottom,transparent,black_8%,black_88%,transparent)] [mask-composite:intersect]"
            src="/raleigh-watercolor.png"
            alt="Watercolor illustration of Raleigh’s skyline framed by oak trees in soft autumn colors"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            preload
          />
        </div>
        <figcaption className="mt-1 px-5 text-right font-display text-sm text-muted italic sm:px-0 sm:text-base">
          A change of scenery. A little breathing room.
        </figcaption>
      </figure>
    </section>
  );
}
