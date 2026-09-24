import { ArrowRight, BookOpen, Compass, House, MapPin } from "lucide-react";
import Link from "next/link";

export function TripSidebar({ onMonday }: Readonly<{ onMonday: () => void }>) {
  return (
    <aside
      className="grid gap-4 sm:grid-cols-2 md:sticky md:top-6 md:grid-cols-1"
      aria-label="Exam and hotel details"
    >
      <section className="relative overflow-hidden rounded-xl bg-pine-deep p-6 text-white shadow-lift sm:p-7">
        <span className="absolute inset-x-0 top-0 h-1 bg-cardinal" aria-hidden="true" />
        <p className="eyebrow text-cardinal-wash">Monday, October 5</p>
        <h2 className="type-title mt-4">Exam day</h2>
        <p className="mt-3 text-lg leading-snug font-semibold">Pediatric dental oral boards</p>
        <p className="mt-1 text-sm text-white/70">ABPD Oral Clinical Examination</p>
        <ol className="mt-6 list-none space-y-3 border-l border-white/20 pl-5">
          <li className="relative grid grid-cols-[5rem_1fr] gap-2 text-sm before:absolute before:top-1.5 before:-left-[1.5625rem] before:size-2 before:rounded-full before:bg-ochre-bright before:content-['']">
            <span className="type-data text-white/80">2:45 PM</span>
            <span>Registration · Session 3</span>
          </li>
          <li className="relative grid grid-cols-[5rem_1fr] gap-2 text-sm before:absolute before:top-1.5 before:-left-[1.5625rem] before:size-2 before:rounded-full before:bg-white/60 before:content-['']">
            <span className="type-data text-white/80">~6:30 PM</span>
            <span>Back at the hotel</span>
          </li>
        </ol>
        <div className="mt-6 flex gap-3 border-t border-white/15 pt-5">
          <MapPin
            className="mt-0.5 text-white/70"
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <div className="text-sm">
            <strong className="font-semibold">AIME Center</strong>
            <p className="text-white/80">4208 Six Forks Road</p>
            <p className="mt-1 text-white/60 italic">Less than a 5-minute walk from your hotel.</p>
          </div>
        </div>
        <button
          type="button"
          className="btn mt-6 w-full bg-white text-pine-deep hover:bg-pine-wash"
          onClick={onMonday}
        >
          See Monday’s plan <ArrowRight size={16} aria-hidden="true" />
        </button>
      </section>
      <section className="card flex gap-4 p-6">
        <span className="grid size-10 place-items-center rounded-full bg-sunk text-pine-deep">
          <House size={18} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="eyebrow">Hotel</p>
          <h3 className="type-subhead mt-2">Hyatt House Raleigh North Hills</h3>
          <p className="type-data mt-1 text-[0.8125rem] text-muted">
            Oct 2–6 · 4 nights · 2 guests
          </p>
          <Link className="link mt-4" href="/details">
            View trip details <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="card p-6 sm:col-span-2 md:col-span-1">
        <p className="eyebrow">Also in this guide</p>
        <Link className="group mt-4 flex items-start gap-4 text-ink no-underline" href="/raleigh">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky-wash text-sky">
            <Compass size={18} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span>
            <strong className="type-subhead block group-hover:text-pine">Explore Raleigh</strong>
            <span className="text-sm text-muted">
              First Friday, a downtown music festival, markets, and places for a study break.
            </span>
          </span>
        </Link>
        <Link
          className="group mt-4 flex items-start gap-4 border-t border-line pt-4 text-ink no-underline"
          href="/study"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-pine-wash text-pine">
            <BookOpen size={18} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span>
            <strong className="type-subhead block group-hover:text-pine">Study plan</strong>
            <span className="text-sm text-muted">
              Seven practice blocks, the full ABPD blueprint, and 2026 guideline updates.
            </span>
          </span>
        </Link>
      </section>
      <p className="text-center text-sm leading-normal text-muted sm:col-span-2 md:col-span-1">
        A sample plan from your travel emails.
        <br />
        Raleigh plans use Eastern time.
      </p>
    </aside>
  );
}
