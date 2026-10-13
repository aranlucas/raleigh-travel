import { ArrowRight, CalendarDays, Clock3, Compass, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { RaleighMap } from "@/components/raleigh-map";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ExternalLink } from "@/components/ui";
import { days } from "@/lib/itinerary";
import { areaOrder, areas, fits, happenings, places, type Place } from "@/lib/raleigh";

export const metadata: Metadata = {
  title: "Explore Raleigh · Raleigh, together",
  description:
    "Things to do in Raleigh around a pediatric boards weekend: what's on October 2–6, and places that fit a study break or a free afternoon.",
};

const fitTones = {
  break: "bg-pine-wash text-pine-deep",
  "half-day": "bg-sky-wash text-sky",
  evening: "bg-ochre-wash text-ochre",
} as const;

function dayShort(dayId: string) {
  const day = days.find((item) => item.id === dayId);

  if (day === undefined) {
    throw new Error(`Unknown trip day: ${dayId}`);
  }

  return `${day.short} ${Number(day.date)}`;
}

type PlaceCardProps = Readonly<{ place: Place }>;

function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article className="flex min-w-0 flex-col card p-5 sm:p-6" id={place.id}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow text-label text-muted">{place.kind}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${fitTones[place.fit]}`}>
          {fits[place.fit]}
        </span>
      </div>
      <h3 className="mbs-3 type-heading">{place.name}</h3>
      <p className="mbs-2 text-body-sm leading-relaxed text-ink-soft">{place.blurb}</p>
      <dl className="mbs-4 flex flex-col gap-1.5 text-sm">
        <div className="flex gap-2">
          <dt className="contents">
            <MapPin className="mbs-0.5 text-muted" size={15} aria-hidden="true" />
            <span className="sr-only">From the hotel</span>
          </dt>
          <dd>
            {place.fromHotel} <span className="text-muted">· {place.cost}</span>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="contents">
            <Clock3 className="mbs-0.5 text-muted" size={15} aria-hidden="true" />
            <span className="sr-only">Hours</span>
          </dt>
          <dd className="text-muted">{place.hours}</dd>
        </div>
      </dl>
      <div className="mbs-auto flex flex-wrap items-center gap-x-5 gap-y-2 pbs-5">
        {place.planned === undefined ? null : (
          <Link
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white no-underline hover:bg-pine-deep"
            href={`/#${place.planned.dayId}`}
          >
            <CalendarDays size={13} aria-hidden="true" />
            In your plan · {place.planned.label}
          </Link>
        )}
        <ExternalLink label="Details" href={place.href} />
        <ExternalLink label="Directions" href={place.directions} />
      </div>
    </article>
  );
}

export default function RaleighPage() {
  return (
    <div>
      <a className="skip-link" href="#raleigh-content">
        Skip to Raleigh guide
      </a>
      <SiteHeader current="raleigh" />
      <main className="page-shell" id="raleigh-content">
        <header className="grid items-center gap-8 py-10 md:grid-editorial md:gap-12 md:pbs-14">
          <div>
            <p className="eyebrow text-label text-muted">
              <Compass size={15} aria-hidden="true" /> Raleigh, NC · Oct 2–6, 2026
            </p>
            <h1 className="mbs-5 type-display">
              Things to do
              <br />
              <span className="text-pine">between study blocks.</span>
            </h1>
            <p className="mbs-6 max-w-120 type-lead">
              Events on October 2–6 and places near the hotel and downtown. Places already in the
              itinerary are ringed on the map.
            </p>
            <Link className="mbs-6 link" href="/">
              Back to the day-by-day plan <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <RaleighMap />
        </header>

        <section className="border-y border-line py-10" aria-labelledby="happening-heading">
          <p className="eyebrow text-label text-muted">October 2–6</p>
          <h2 className="mbs-3 type-title" id="happening-heading">
            Events while you’re there
          </h2>
          <ol className="mbs-7 grid list-none gap-4 md:grid-cols-2">
            {happenings.map((event) => (
              <li className="flex gap-4 card p-5 sm:p-6" key={event.id}>
                <Link
                  className="flex h-fit w-14 shrink-0 flex-col items-center rounded-md bg-sunk py-2 text-ink no-underline hover:bg-pine-wash"
                  href={`/#${event.dayId}`}
                  aria-label={`See ${dayShort(event.dayId)} in the plan`}
                >
                  <span className="type-data text-2xs tracking-widest text-muted">
                    {dayShort(event.dayId).split(" ")[0]}
                  </span>
                  <span className="font-display text-3xl leading-none">
                    {dayShort(event.dayId).split(" ")[1]}
                  </span>
                </Link>
                <div className="min-w-0">
                  <h3 className="type-subhead">{event.name}</h3>
                  <p className="mbs-1 type-data text-meta text-muted">
                    {event.when} · {event.where}
                  </p>
                  <p className="mbs-2 text-body-sm leading-relaxed text-ink-soft">{event.blurb}</p>
                  <p className="mbs-2 text-body-sm leading-relaxed font-medium text-pine-deep">
                    {event.verdict}
                  </p>
                  <div className="mbs-3">
                    <ExternalLink label="Event details" href={event.href} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p className="mbs-5 text-sm text-muted">
            The NC State Fair (October 15–25) opens the week after you leave.
          </p>
        </section>

        {areaOrder.map((area) => (
          <section className="pbs-12" key={area} aria-labelledby={`${area}-heading`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 className="type-title" id={`${area}-heading`}>
                {areas[area].label}
              </h2>
              <p className="text-body-sm text-muted">{areas[area].note}</p>
            </div>
            <div className="mbs-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {places
                .filter((place) => place.area === area)
                .map((place) => (
                  <PlaceCard place={place} key={place.id} />
                ))}
            </div>
          </section>
        ))}

        <p className="mbs-10 text-sm text-muted">
          Hours and prices were checked September 23, 2026 and can change; confirm before heading
          out. Travel times are rough estimates from Hyatt House North Hills.
        </p>
        <SiteFooter next={{ href: "/", label: "Back to the itinerary" }} />
      </main>
    </div>
  );
}
