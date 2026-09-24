import { BookOpen, CalendarDays, House, Plane } from "lucide-react";

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

const linkGroupClasses = "mt-5 flex flex-wrap gap-x-6 gap-y-2";

type Leg = Readonly<{ flight: string; depart: string; arrive: string }>;

/** Origin, connection, destination on one line; the connection is flagged when it is tight. */
function RouteLine({
  stops,
  legs,
  connection,
  tight = false,
}: Readonly<{
  stops: readonly [string, string, string];
  legs: readonly [Leg, Leg];
  connection: string;
  tight?: boolean;
}>) {
  const [origin, via, destination] = stops;
  const [first, second] = legs;
  return (
    <div className="mt-6">
      <p className="sr-only">
        {first.flight} departs {origin} {first.depart}, arrives {via} {first.arrive}. {connection}{" "}
        connection. {second.flight} departs {via} {second.depart}, arrives {destination}{" "}
        {second.arrive}.
      </p>
      <div
        className="grid grid-cols-[auto_minmax(1.5rem,1fr)_auto_minmax(1.5rem,1fr)_auto] items-center gap-x-2 sm:gap-x-3"
        aria-hidden="true"
      >
        <span className="type-data text-2xl leading-none font-medium sm:text-3xl">{origin}</span>
        <FlightPath flight={first.flight} />
        <span
          className={`type-data rounded-md px-2 py-1 text-2xl leading-none font-medium sm:text-3xl ${tight ? "bg-ochre-wash text-ochre" : "bg-sunk"}`}
        >
          {via}
        </span>
        <FlightPath flight={second.flight} />
        <span className="type-data text-2xl leading-none font-medium sm:text-3xl">
          {destination}
        </span>
        <span className="type-data mt-2 text-[0.6875rem] whitespace-nowrap text-muted sm:text-xs">
          {first.depart}
        </span>
        <span />
        <span className="type-data mt-2 flex flex-col items-center text-center text-xs text-muted">
          <span>{first.arrive}</span>
          <span
            className={`my-1 rounded-full px-2 py-0.5 font-medium whitespace-nowrap ${tight ? "bg-ochre-bright text-white" : "bg-sunk text-ink-soft"}`}
          >
            {connection}
            {tight ? " · tight" : ""}
          </span>
          <span>{second.depart}</span>
        </span>
        <span />
        <span className="type-data mt-2 text-right text-[0.6875rem] whitespace-nowrap text-muted sm:text-xs">
          {second.arrive}
        </span>
      </div>
    </div>
  );
}

function FlightPath({ flight }: Readonly<{ flight: string }>) {
  return (
    <span className="relative flex flex-col items-center">
      <span className="type-data absolute bottom-3 text-[0.6875rem] tracking-wider whitespace-nowrap text-muted">
        {flight}
      </span>
      <span className="relative h-px w-full bg-line-strong">
        <Plane
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-surface px-0.5 text-pine"
          size={16}
          strokeWidth={1.75}
        />
      </span>
    </span>
  );
}

function DetailCard({
  icon,
  title,
  meta,
  children,
}: Readonly<{
  icon: React.ReactNode;
  title: string;
  meta?: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="card min-w-0 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-sunk text-pine-deep">
          {icon}
        </span>
        <div>
          <h3 className="type-heading">{title}</h3>
          {meta === undefined ? null : <p className="eyebrow mt-1">{meta}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Facts({ rows }: Readonly<{ rows: readonly (readonly [string, string])[] }>) {
  return (
    <dl className="mt-6 mb-5 border-t border-line">
      {rows.map(([term, value]) => (
        <div
          className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-2.5 text-[0.9375rem] sm:grid-cols-[9rem_1fr]"
          key={term}
        >
          <dt className="text-muted">{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const icon = { size: 18, strokeWidth: 1.75, "aria-hidden": true } as const;

export function TripDetails() {
  const totalStudy = days.reduce((total, day) => total + studyMinutes(day), 0);
  return (
    <section className="animate-fade-up" aria-labelledby="details-heading">
      <div className="pb-8">
        <p className="eyebrow">Trip details</p>
        <h2 id="details-heading" className="type-title mt-3">
          The details, taken care of.
        </h2>
        <p className="type-lead mt-2">
          Confirmed travel, a protected board day, and a plan with room to breathe.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        <DetailCard icon={<Plane {...icon} />} title="Getting there" meta="Fri, Oct 2 · 7h 14m">
          <RouteLine
            stops={["SEA", "CLT", "RDU"]}
            legs={[
              { flight: "AA 381", depart: "6:40 AM PT", arrive: "2:50 PM ET" },
              { flight: "AA 1894", depart: "3:58 PM ET", arrive: "4:54 PM ET" },
            ]}
            connection="1h 8m"
          />
          <p className="mt-6 border-t border-line pt-4 text-[0.9375rem] leading-relaxed text-muted">
            Suggested SEA arrival: 4:40 AM Pacific. Hotel arrival around 6 PM Eastern.
          </p>
        </DetailCard>
        <DetailCard icon={<Plane {...icon} />} title="Coming home" meta="Tue, Oct 6 · 8h 31m">
          <RouteLine
            stops={["RDU", "DFW", "SEA"]}
            legs={[
              { flight: "AA 2693", depart: "2:13 PM ET", arrive: "4:30 PM CT" },
              { flight: "AA 1483", depart: "5:21 PM CT", arrive: "7:44 PM PT" },
            ]}
            connection="51m"
            tight
          />
          <p className="mt-6 border-t border-line pt-4 text-[0.9375rem] leading-relaxed text-muted">
            Leave the hotel around 11 AM; target RDU by 11:45 AM. At DFW, head to your onward gate
            first.
          </p>
        </DetailCard>
        <DetailCard icon={<House {...icon} />} title="A comfortable home base">
          <h4 className="type-subhead mt-6">Hyatt House Raleigh North Hills</h4>
          <p className="mt-1 text-[0.9375rem] text-muted">
            160 Park at North Hills Street
            <br />
            Raleigh, NC 27609
          </p>
          <Facts
            rows={[
              ["Stay", "October 2–6 · 4 nights"],
              ["Room", "1 king bed · 2 guests"],
              ["Check-in", "Friday from 3 PM"],
              ["Checkout", "Tuesday by noon"],
            ]}
          />
          <p className="text-[0.9375rem] leading-relaxed text-muted">
            Bring photo ID and a card for incidentals. Planned Tuesday checkout is 10:45 AM.
          </p>
          <div className={linkGroupClasses}>
            <ExternalLink label="Directions" href={maps(hotelAddress)} />
          </div>
        </DetailCard>
        <DetailCard
          icon={<CalendarDays {...icon} className="text-cardinal" />}
          title="The milestone"
          meta="Mon, Oct 5 · Session 3"
        >
          <h4 className="type-subhead mt-6">ABPD Oral Clinical Examination</h4>
          <p className="mt-1 text-[0.9375rem] text-muted">AIME Center · 4208 Six Forks Road</p>
          <Facts
            rows={[
              ["Leave the hotel", "About 2:25 PM"],
              ["Registration", "2:45 PM"],
              ["Hotel return", "About 6:15 PM"],
            ]}
          />
          <p className="text-[0.9375rem] leading-relaxed text-muted">
            Wait in the lobby for the ABPD representative. Registration will not open early. The
            email’s session times are tentative; follow the latest official instructions.
          </p>
          <div className={linkGroupClasses}>
            <ExternalLink label="Official ABPD exam information" href={sources.abpd} />
            <ExternalLink label="Directions" href={maps(examAddress)} />
          </div>
        </DetailCard>
      </div>
      <section className="panel mt-4 p-6 sm:p-8 lg:mt-6 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          <div>
            <p className="eyebrow text-pine">
              <BookOpen size={14} aria-hidden="true" /> Study plan
            </p>
            <h3 className="type-title mt-3">A little structure for studying</h3>
            <p className="mt-3 text-lg">
              {duration(totalStudy)} of focused preparation
              <span className="mt-1 block text-[0.9375rem] text-muted">
                + an optional 30 minutes on Friday’s flight
              </span>
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {days
                .filter((day) => studyMinutes(day) > 0)
                .map((day) => (
                  <div className="rounded-md bg-surface p-4" key={day.id}>
                    <span className="eyebrow">{day.short}</span>
                    <p className="mt-1 font-display text-3xl leading-none">
                      {duration(studyMinutes(day))}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {day.id === "saturday"
                        ? "Clinical cases & weak areas"
                        : day.id === "sunday"
                          ? "Rehearsal & a final recap"
                          : "Light review, then switch off"}
                    </p>
                  </div>
                ))}
            </div>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
              Practice your reasoning out loud, including how you would explain decisions to a
              child’s family. Topics here are suggestions to organize your own materials, not a
              complete exam blueprint or clinical guidance.
            </p>
            <div className={linkGroupClasses}>
              <ExternalLink label="Open your study guide" href="/study" />
              <ExternalLink label="One-page recap" href="/study/recap" />
              <ExternalLink label="Official ABPD OCE resources" href={sources.abpd} />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-12 max-w-[60rem]">
        <h3 className="type-heading">Where the plan comes from</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
          Hotel and exam logistics come from the Gmail confirmations reviewed September 23, 2026.
          You supplied the flight schedules. Flight status is not live. Meals, study blocks,
          transfers, and outings are suggestions; no restaurant reservations have been made. Meal
          choices favor local restaurants and value; budgets are per-person estimates for food
          before tax, tip, and drinks.
        </p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
          Flight times are local to each airport: PT in Seattle, CT in Dallas, ET in Charlotte and
          Raleigh. All other itinerary times are Eastern. Visitor hours were checked September 23;
          review the linked venue pages before going. Personal names, booking identifiers, and
          private email links are omitted from this public version.
        </p>
        <div className={linkGroupClasses}>
          <ExternalLink label="Science museum" href={sources.science} />
          <ExternalLink label="State Capitol" href={sources.capitol} />
          <ExternalLink label="Art museum" href={sources.art} />
          <ExternalLink label="Restaurant menus" href={sources.vivace} />
        </div>
      </section>
    </section>
  );
}
