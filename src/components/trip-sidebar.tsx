import { ArrowRight, BookOpen, Compass, House, MapPin } from "lucide-react";
import Link from "next/link";

type TripSidebarProps = Readonly<{ onMonday: () => void }>;

export function TripSidebar({ onMonday }: TripSidebarProps) {
  return (
    <aside
      className="grid gap-4 sm:grid-cols-2 md:sticky md:inset-bs-6 md:grid-cols-1"
      aria-label="Exam and hotel details"
    >
      <section className="relative overflow-hidden rounded-xl bg-pine-deep p-6 text-white shadow-lift sm:p-7">
        <span className="absolute inset-x-0 inset-bs-0 h-1 bg-cardinal" aria-hidden="true" />
        <p className="eyebrow text-label text-cardinal-wash">Monday, October 5</p>
        <h2 className="mbs-4 type-title">Exam day</h2>
        <p className="mbs-3 text-lg leading-snug font-semibold">Pediatric dental oral boards</p>
        <p className="mbs-1 text-sm text-white/70">ABPD Oral Clinical Examination</p>
        <ol className="mbs-6 flex list-none flex-col gap-3 border-s border-white/20 ps-5">
          <li className="relative grid grid-shift gap-2 text-sm before:absolute before:-start-6.25 before:inset-bs-1.5 before:size-2 before:rounded-full before:bg-ochre-bright before:content-empty">
            <span className="type-data text-white/80">2:45 PM</span>
            <span>Registration · Session 3</span>
          </li>
          <li className="relative grid grid-shift gap-2 text-sm before:absolute before:-start-6.25 before:inset-bs-1.5 before:size-2 before:rounded-full before:bg-white/60 before:content-empty">
            <span className="type-data text-white/80">~6:30 PM</span>
            <span>Back at the hotel</span>
          </li>
        </ol>
        <div className="mbs-6 flex gap-3 border-bs border-white/15 pbs-5">
          <MapPin
            className="mbs-0.5 text-white/70"
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <div className="text-sm">
            <strong className="font-semibold">AIME Center</strong>
            <p className="text-white/80">4208 Six Forks Road</p>
            <p className="mbs-1 text-white/60 italic">Less than a 5-minute walk from your hotel.</p>
          </div>
        </div>
        <button
          type="button"
          className="mbs-6 btn w-full bg-white text-pine-deep hover:bg-pine-wash"
          onClick={onMonday}
        >
          See Monday’s plan <ArrowRight size={16} aria-hidden="true" />
        </button>
      </section>
      <section className="flex gap-4 card p-6">
        <span className="grid size-10 place-items-center rounded-full bg-sunk text-pine-deep">
          <House size={18} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="eyebrow text-label text-muted">Hotel</p>
          <h3 className="mbs-2 type-subhead">Hyatt House Raleigh North Hills</h3>
          <p className="mbs-1 type-data text-meta text-muted">Oct 2–6 · 4 nights · 2 guests</p>
          <Link className="mbs-4 link" href="/details">
            View trip details <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="card p-6 sm:col-span-2 md:col-span-1">
        <p className="eyebrow text-label text-muted">Also in this guide</p>
        <Link className="group mbs-4 flex items-start gap-4 text-ink no-underline" href="/raleigh">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky-wash text-sky">
            <Compass size={18} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span>
            <strong className="block type-subhead group-hover:text-pine">Explore Raleigh</strong>
            <span className="text-sm text-muted">
              First Friday, a downtown music festival, markets, and places for a study break.
            </span>
          </span>
        </Link>
        <Link
          className="group mbs-4 flex items-start gap-4 border-bs border-line pbs-4 text-ink no-underline"
          href="https://oral-boards.vercel.app/study"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-pine-wash text-pine">
            <BookOpen size={18} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span>
            <strong className="block type-subhead group-hover:text-pine">
              Oral Boards study companion ↗
            </strong>
            <span className="text-sm text-muted">
              Practice sessions, theme notes, and flashcards live on the dedicated study site.
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
