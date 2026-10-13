import { MapPin } from "lucide-react";
import Image from "next/image";

export function TripHero() {
  return (
    <section
      className="grid items-center gap-8 py-10 md:grid-cols-2 md:py-14"
      aria-label="Raleigh trip"
    >
      <div>
        <p className="eyebrow text-label text-muted">
          <MapPin size={14} aria-hidden="true" />
          Raleigh, NC · Oct 2–6, 2026
        </p>
        <h1 className="mbs-5 type-display">
          A few days
          <br />
          <span className="text-pine">in Raleigh.</span>
        </h1>
        <p className="mbs-6 max-w-104 type-lead">
          Your flights, a place to settle in, and time to explore. Five days of good food, city
          walks, and a little celebrating.
        </p>
      </div>
      <figure className="relative -mx-5 sm:mx-0">
        <div className="relative aspect-5/2">
          <Image
            className="mask-hero-fade mask-intersect object-cover"
            src="/raleigh-watercolor.png"
            alt="Watercolor illustration of Raleigh’s skyline framed by oak trees in soft autumn colors"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            preload
          />
        </div>
      </figure>
    </section>
  );
}
