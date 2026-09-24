import { ArrowRight, BookOpen, CalendarDays, House, Plane } from "lucide-react";

import {
  days,
  duration,
  examAddress,
  hotelAddress,
  maps,
  sources,
  studyMinutes,
} from "@/lib/itinerary";

import { ExternalLink } from "./ui";

const detailLinkGroupClasses = "mt-4 flex flex-wrap gap-x-6 gap-y-3";

function FlightLeg({
  flight,
  from,
  to,
  depart,
  arrive,
}: Readonly<{
  flight: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
}>) {
  return (
    <div className="my-6 grid grid-cols-3 items-center gap-3">
      <div className="flex flex-col">
        <span className="text-3xl font-medium leading-normal">{from}</span>
        <strong className="text-sm font-medium">{depart}</strong>
      </div>
      <div className="flex flex-col items-center gap-1 text-sm text-slate-600">
        <span>{flight}</span>
        <ArrowRight className="w-[76%]" size={24} strokeWidth={1} aria-hidden="true" />
      </div>
      <div className="flex flex-col items-end">
        <span className="text-3xl font-medium leading-normal">{to}</span>
        <strong className="text-sm font-medium">{arrive}</strong>
      </div>
    </div>
  );
}

export function TripDetails() {
  const totalStudy = days.reduce((total, day) => total + studyMinutes(day), 0);
  return (
    <section aria-labelledby="details-heading">
      <div className="border-t border-slate-200 pt-7 pb-6">
        <h2
          id="details-heading"
          className="text-4xl font-medium leading-tight tracking-tight md:text-5xl"
        >
          The details, taken care of.
        </h2>
        <p className="mt-2 text-slate-600">
          Confirmed travel, a protected board day, and a plan with room to breathe.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:gap-x-15">
        <section className="min-w-0 border-t border-slate-200 pt-7 pb-8">
          <div className="flex items-center gap-3">
            <Plane size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-3xl font-medium tracking-tight">Getting there</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600">Friday, October 2 · 7 hrs 14 mins</p>
          <FlightLeg flight="AA 381" from="SEA" to="CLT" depart="6:40 AM PT" arrive="2:50 PM ET" />
          <p className="border-l-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-slate-600">
            1 hr 8 min connection in Charlotte
          </p>
          <FlightLeg flight="AA 1894" from="CLT" to="RDU" depart="3:58 PM ET" arrive="4:54 PM ET" />
          <p className="text-sm leading-relaxed text-slate-600">
            Suggested SEA arrival: 4:40 AM Pacific. Hotel arrival around 6 PM Eastern.
          </p>
        </section>
        <section className="min-w-0 border-t border-slate-200 pt-7 pb-8">
          <div className="flex items-center gap-3">
            <Plane size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-3xl font-medium tracking-tight">Coming home</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600">Tuesday, October 6 · 8 hrs 31 mins</p>
          <FlightLeg flight="AA 2693" from="RDU" to="DFW" depart="2:13 PM ET" arrive="4:30 PM CT" />
          <p className="border-l-2 border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Short connection · 51 minutes in Dallas
          </p>
          <FlightLeg flight="AA 1483" from="DFW" to="SEA" depart="5:21 PM CT" arrive="7:44 PM PT" />
          <p className="text-sm leading-relaxed text-slate-600">
            Leave the hotel around 11 AM; target RDU by 11:45 AM. At DFW, head to your onward gate
            first.
          </p>
        </section>
        <section className="min-w-0 border-t border-slate-200 pt-7 pb-8">
          <div className="flex items-center gap-3">
            <House size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-3xl font-medium tracking-tight">A comfortable home base</h3>
          </div>
          <h4 className="mt-4 mb-1 text-base font-medium">Hyatt House Raleigh North Hills</h4>
          <p className="text-sm text-slate-600">
            160 Park at North Hills Street
            <br />
            Raleigh, NC 27609
          </p>
          <dl className="mt-6 mb-4">
            <div className="grid grid-cols-[116px_1fr] gap-4 border-b border-slate-200 py-2 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-slate-600">Stay</dt>
              <dd className="m-0">October 2–6 · 4 nights</dd>
            </div>
            <div className="grid grid-cols-[116px_1fr] gap-4 border-b border-slate-200 py-2 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-slate-600">Room</dt>
              <dd className="m-0">1 king bed · 2 guests</dd>
            </div>
            <div className="grid grid-cols-[116px_1fr] gap-4 border-b border-slate-200 py-2 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-slate-600">Check-in</dt>
              <dd className="m-0">Friday from 3 PM</dd>
            </div>
            <div className="grid grid-cols-[116px_1fr] gap-4 border-b border-slate-200 py-2 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-slate-600">Checkout</dt>
              <dd className="m-0">Tuesday by noon</dd>
            </div>
          </dl>
          <p className="text-sm leading-relaxed text-slate-600">
            Bring photo ID and a card for incidentals. Planned Tuesday checkout is 10:45 AM.
          </p>
          <div className={detailLinkGroupClasses}>
            <ExternalLink label="Directions" href={maps(hotelAddress)} />
          </div>
        </section>
        <section className="min-w-0 border-t border-slate-200 pt-7 pb-8">
          <div className="flex items-center gap-3">
            <CalendarDays size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-3xl font-medium tracking-tight">The milestone</h3>
          </div>
          <h4 className="mt-4 mb-1 text-base font-medium">ABPD Oral Clinical Examination</h4>
          <p className="text-sm text-slate-600">
            Monday, October 5 · Session 3<br />
            AIME Center · 4208 Six Forks Road
          </p>
          <dl className="mt-6 mb-4">
            <div className="grid grid-cols-[116px_1fr] gap-4 border-b border-slate-200 py-2 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-slate-600">Leave the hotel</dt>
              <dd className="m-0">About 2:25 PM</dd>
            </div>
            <div className="grid grid-cols-[116px_1fr] gap-4 border-b border-slate-200 py-2 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-slate-600">Registration</dt>
              <dd className="m-0">2:45 PM</dd>
            </div>
            <div className="grid grid-cols-[116px_1fr] gap-4 border-b border-slate-200 py-2 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-slate-600">Hotel return</dt>
              <dd className="m-0">About 6:15 PM</dd>
            </div>
          </dl>
          <p className="text-sm leading-relaxed text-slate-600">
            Wait in the lobby for the ABPD representative. Registration will not open early. The
            email’s session times are tentative; follow the latest official instructions.
          </p>
          <div className={detailLinkGroupClasses}>
            <ExternalLink label="Official ABPD exam information" href={sources.abpd} />
            <ExternalLink label="Directions" href={maps(examAddress)} />
          </div>
        </section>
      </div>
      <section className="mt-4 mb-9 rounded-lg bg-emerald-50 px-6 py-6 md:px-8 md:py-7">
        <div className="flex items-center gap-3">
          <BookOpen size={23} strokeWidth={1.5} aria-hidden="true" />
          <h3 className="text-3xl font-medium tracking-tight">A little structure for studying</h3>
        </div>
        <p className="mt-2 text-base">
          {duration(totalStudy)} of focused preparation
          <span className="text-sm text-slate-600 max-sm:mt-1 max-sm:block">
            + an optional 30 minutes on Friday’s flight
          </span>
        </p>
        <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {days
            .filter((day) => studyMinutes(day) > 0)
            .map((day) => (
              <div className="border-t border-slate-200 pt-4" key={day.id}>
                <strong className="mr-4 inline-block text-sm tracking-wide">{day.short}</strong>
                <span className="text-2xl font-medium leading-normal">
                  {duration(studyMinutes(day))}
                </span>
                <p className="mt-1 text-sm text-slate-600">
                  {day.id === "saturday"
                    ? "Clinical cases & weak areas"
                    : day.id === "sunday"
                      ? "Rehearsal & a final recap"
                      : "Light review, then switch off"}
                </p>
              </div>
            ))}
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          Practice your reasoning out loud, including how you would explain decisions to a child’s
          family. Topics here are suggestions to organize your own materials, not a complete exam
          blueprint or clinical guidance.
        </p>
        <div className={detailLinkGroupClasses}>
          <ExternalLink label="Open your study guide" href="/study" />
          <ExternalLink label="One-page recap" href="/study/recap" />
          <ExternalLink label="Official ABPD OCE resources" href={sources.abpd} />
        </div>
      </section>
      <section className="max-w-[920px]">
        <h3 className="text-3xl font-medium">Where the plan comes from</h3>
        <p className="mt-2 text-sm text-slate-600">
          Hotel and exam logistics come from the Gmail confirmations reviewed September 23, 2026.
          You supplied the flight schedules. Flight status is not live. Meals, study blocks,
          transfers, and outings are suggestions; no restaurant reservations have been made. Meal
          choices favor local restaurants and value; budgets are per-person estimates for food
          before tax, tip, and drinks.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Flight times are local to each airport: PT in Seattle, CT in Dallas, ET in Charlotte and
          Raleigh. All other itinerary times are Eastern. Visitor hours were checked September 23;
          review the linked venue pages before going. Personal names, booking identifiers, and
          private email links are omitted from this public version.
        </p>
        <div className={detailLinkGroupClasses}>
          <ExternalLink label="Science museum" href={sources.science} />
          <ExternalLink label="State Capitol" href={sources.capitol} />
          <ExternalLink label="Art museum" href={sources.art} />
          <ExternalLink label="Restaurant menus" href={sources.vivace} />
        </div>
      </section>
    </section>
  );
}
