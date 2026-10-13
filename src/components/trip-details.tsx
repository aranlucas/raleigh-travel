import { BookOpen, CalendarDays, CircleCheck, House, Plane } from "lucide-react";

import { examDayRules, examFacts } from "@/lib/exam-day";
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

const linkGroupClasses = "mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-5";

type Leg = Readonly<{ flight: string; depart: string; arrive: string }>;

type Stops = readonly [string, string, string];

type Legs = readonly [Leg, Leg];

type RouteLineProps = Readonly<{
  stops: Stops;
  legs: Legs;
  connection: string;
  tight?: boolean;
}>;

/** Origin, connection, destination on one line; the connection is flagged when it is tight. */
function RouteLine({ stops, legs, connection, tight = false }: RouteLineProps) {
  const [origin, via, destination] = stops;
  const [first, second] = legs;

  return (
    <div className="mbs-6">
      <p className="sr-only">
        {first.flight} departs {origin} {first.depart}, arrives {via} {first.arrive}. {connection}{" "}
        connection. {second.flight} departs {via} {second.depart}, arrives {destination}{" "}
        {second.arrive}.
      </p>
      <div className="grid grid-route items-center gap-x-2 sm:gap-x-3" aria-hidden="true">
        <span className="type-data text-2xl leading-none font-medium sm:text-3xl">{origin}</span>
        <FlightPath flight={first.flight} />
        <span
          className={`rounded-md px-2 py-1 type-data text-2xl leading-none font-medium sm:text-3xl ${tight ? "bg-ochre-wash text-ochre" : "bg-sunk"}`}
        >
          {via}
        </span>
        <FlightPath flight={second.flight} />
        <span className="type-data text-2xl leading-none font-medium sm:text-3xl">
          {destination}
        </span>
        <span className="mbs-2 type-data text-2xs whitespace-nowrap text-muted sm:text-xs">
          {first.depart}
        </span>
        <span />
        <span className="mbs-2 flex flex-col items-center text-center type-data text-xs text-muted">
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
        <span className="mbs-2 text-end type-data text-2xs whitespace-nowrap text-muted sm:text-xs">
          {second.arrive}
        </span>
      </div>
    </div>
  );
}

type FlightPathProps = Readonly<{ flight: string }>;

function FlightPath({ flight }: FlightPathProps) {
  return (
    <span className="relative flex flex-col items-center">
      <span className="absolute inset-be-3 type-data text-2xs tracking-wider whitespace-nowrap text-muted">
        {flight}
      </span>
      <span className="relative h-px w-full bg-line-strong">
        <Plane
          className="absolute inset-s-1/2 inset-bs-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-surface px-0.5 text-pine"
          size={16}
          strokeWidth={1.75}
        />
      </span>
    </span>
  );
}

type DetailCardProps = Readonly<{
  icon: React.ReactNode;
  title: string;
  meta?: string;
  children: React.ReactNode;
}>;

function DetailCard({ icon, title, meta, children }: DetailCardProps) {
  return (
    <section className="flex min-w-0 flex-col card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-sunk text-pine-deep">
          {icon}
        </span>
        <div>
          <h3 className="type-heading">{title}</h3>
          {meta === undefined ? null : (
            <p className="mbs-1 eyebrow text-label text-muted">{meta}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

type FactRow = readonly [string, string];

type FactsProps = Readonly<{ rows: readonly FactRow[] }>;

function Facts({ rows }: FactsProps) {
  return (
    <dl className="mbs-6 mbe-5 border-bs border-line">
      {rows.map(([term, value]) => (
        <div
          className="grid grid-facts gap-4 border-be border-line py-2.5 text-body-sm sm:grid-facts-wide"
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

function shortDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return [hours > 0 ? `${hours}h` : "", rest > 0 ? `${rest}m` : ""].filter(Boolean).join(" ");
}

const keyMoments = [
  { day: "Fri, Oct 2", time: "6:43 PM", label: "Land at RDU" },
  { day: "Sat–Sun", time: "9:00 AM", label: "Morning study blocks" },
  { day: "Mon, Oct 5", time: "2:45 PM", label: "Exam registration", milestone: true },
  { day: "Tue, Oct 6", time: "2:13 PM", label: "Fly home" },
] as const;

export function TripDetails() {
  const totalStudy = days.reduce((total, day) => total + studyMinutes(day), 0);

  return (
    <section className="animate-fade-up" aria-labelledby="details-heading">
      <div className="pbe-8">
        <p className="eyebrow text-label text-muted">Trip details</p>
        <h2 id="details-heading" className="mbs-3 type-title">
          Flights, hotel, and the exam
        </h2>
        <p className="mbs-2 type-lead">Booked travel and the exam-day details in one place.</p>
      </div>
      <ol
        className="mbe-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4"
        aria-label="Key moments"
      >
        {keyMoments.map((moment) => (
          <li
            className={`px-4 py-3 sm:px-5 sm:py-4 ${"milestone" in moment ? "bg-cardinal-wash" : "bg-surface"}`}
            key={moment.label}
          >
            <span className="eyebrow text-label text-muted">{moment.day}</span>
            <p className="mbs-1 type-data text-xl font-medium">{moment.time}</p>
            <p
              className={`text-sm ${"milestone" in moment ? "font-medium text-cardinal" : "text-muted"}`}
            >
              {moment.label}
            </p>
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        <DetailCard icon={<Plane {...icon} />} title="Getting there" meta="Fri, Oct 2 · 7h 28m">
          <RouteLine
            stops={["SEA", "CLT", "RDU"]}
            legs={[
              { flight: "AA 381", depart: "8:15 AM PT", arrive: "4:25 PM ET" },
              { flight: "AA 1904", depart: "5:45 PM ET", arrive: "6:43 PM ET" },
            ]}
            connection="1h 20m"
          />
          <p className="mbs-6 border-bs border-line pbs-4 text-body-sm leading-relaxed text-muted">
            AA 381 delayed; AA 1904 replaces AA 1894. Updated from American’s October 1 emails
            (latest at 4:07 PM Pacific). Get new boarding passes for each passenger. Suggested SEA
            arrival: around 6:30 AM Pacific, subject to airline guidance. Hotel arrival around 7:45
            PM Eastern. Check the American app for current status and gates.
          </p>
          <p className="mbs-3 text-body-sm leading-relaxed text-muted">
            Light rail: reach Capitol Hill’s southbound platform by 5:15 AM PT. Take the 5:28 AM 1
            Line toward Federal Way; arrive at SeaTac/Airport at 6:09 AM. Allow 15–20 minutes to
            walk to the terminal, arriving around 6:25–6:30 AM. Allow about 1 hour 45 minutes before
            departure; confirm airline check-in and bag-drop guidance and check service alerts
            before leaving.
          </p>
          <div className={linkGroupClasses}>
            <ExternalLink
              label="Friday light rail schedule"
              href="https://www.soundtransit.org/ride-with-us/routes-schedules/1-line?direction=0&route_tab=schedule&at=1790924400000"
            />
          </div>
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
          <p className="mbs-6 border-bs border-line pbs-4 text-body-sm leading-relaxed text-muted">
            Leave the hotel around 11 AM; target RDU by 11:45 AM. At DFW, head to your onward gate
            first. These are saved flight times; recheck both legs, seats, and gates in the American
            app before travel.
          </p>
        </DetailCard>
        <DetailCard icon={<House {...icon} />} title="A comfortable home base">
          <h4 className="mbs-6 type-subhead">Hyatt House Raleigh North Hills</h4>
          <p className="mbs-1 text-body-sm text-muted">
            160 Park at North Hills Street
            <br />
            Raleigh, NC 27609
          </p>
          <Facts
            rows={[
              ["Stay", "October 2–6 · 4 nights"],
              ["Room", "1 king bed · 2 guests"],
              ["Check-in", "Friday from 3 PM"],
              ["Checkout", "Tuesday by noon · plan for 10:45 AM"],
              ["Bring", "Photo ID and a card for incidentals"],
            ]}
          />
          <p className="text-body-sm leading-relaxed text-muted">
            Room and tax are prepaid through Chase Travel. Have the primary guest on the
            confirmation present for check-in, or arrange access with the hotel beforehand. Contact
            the hotel if further flight delays push arrival very late.
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
          <h4 className="mbs-6 type-subhead">ABPD Oral Clinical Examination</h4>
          <p className="mbs-1 text-body-sm text-muted">AIME Center · 4208 Six Forks Road</p>
          <Facts
            rows={[
              ["Leave the hotel", "About 2:25 PM"],
              ["Registration", "2:45 PM"],
              ["Hotel return", "About 6:15–6:45 PM"],
              ["Bring", "Government photo ID"],
            ]}
          />
          <p className="text-body-sm leading-relaxed text-muted">
            Wait in the lobby for the ABPD representative; registration won’t open early.
          </p>
          <div className={linkGroupClasses}>
            <ExternalLink label="Official ABPD exam information" href={sources.abpd} />
            <ExternalLink label="Directions" href={maps(examAddress)} />
          </div>
        </DetailCard>
      </div>
      <section
        className="mbs-4 scroll-mbs-6 card p-6 sm:p-8 lg:mbs-6 lg:p-10"
        id="exam-day"
        aria-labelledby="exam-day-heading"
      >
        <p className="eyebrow text-label text-cardinal">
          Monday, October 5 · from ABPD’s candidate guide
        </p>
        <h3 className="mbs-3 type-title" id="exam-day-heading">
          How the exam afternoon runs
        </h3>
        <div className="mbs-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <dl className="border-bs border-line">
            {examFacts.map((fact) => (
              <div
                className="grid grid-facts gap-4 border-be border-line py-2.5 text-body-sm sm:grid-facts-wide"
                key={fact.label}
              >
                <dt className="text-muted">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h4 className="type-subhead">Bring, lock away, leave behind</h4>
            <ul className="mbs-3 flex flex-col gap-2.5">
              {examDayRules.map((rule) => (
                <li className="flex gap-3 text-body-sm leading-relaxed text-ink-soft" key={rule}>
                  <CircleCheck
                    className="mbs-1 text-pine"
                    size={16}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {rule}
                </li>
              ))}
            </ul>
            <p className="mbs-4 text-sm text-muted">
              Checked against ABPD on September 23, 2026. Your latest candidate email takes
              precedence.
            </p>
          </div>
        </div>
        <div className={linkGroupClasses}>
          <ExternalLink
            label="ABPD examination day"
            href="https://www.abpd.org/become-certified/oral-clinical-examination/examination-day-oce"
          />
          <ExternalLink
            label="OCE candidate guide · PDF"
            href="https://www.abpd.org/index.php/download_file/view/951/276"
          />
        </div>
      </section>
      <section className="mbs-4 panel p-6 sm:p-8 lg:mbs-6 lg:p-10">
        <div className="grid gap-8 lg:grid-study lg:gap-12">
          <div>
            <p className="eyebrow text-label text-pine">
              <BookOpen size={14} aria-hidden="true" /> Study plan
            </p>
            <h3 className="mbs-3 type-title">Study time</h3>
            <p className="mbs-3 text-lg">
              {duration(totalStudy)} of focused preparation
              <span className="mbs-1 block text-body-sm text-muted">
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
                    <span className="eyebrow text-label text-muted">{day.short}</span>
                    <p className="mbs-1 font-display text-3xl leading-none whitespace-nowrap">
                      {shortDuration(studyMinutes(day))}
                    </p>
                    <p className="mbs-2 text-sm text-muted">
                      {day.id === "saturday"
                        ? "Clinical cases & weak areas"
                        : day.id === "sunday"
                          ? "Rehearsal & a final recap"
                          : "Light review, then switch off"}
                    </p>
                  </div>
                ))}
            </div>
            <p className="mbs-5 text-body-sm leading-relaxed text-ink-soft">
              Practice your reasoning out loud, including how you would explain decisions to a
              child’s family.
            </p>
            <div className={linkGroupClasses}>
              <ExternalLink
                label="Open your study guide"
                href="https://oral-boards.vercel.app/study"
              />
              <ExternalLink
                label="Theme notes"
                href="https://oral-boards.vercel.app/study/themes"
              />
              <ExternalLink
                label="One-page recap"
                href="https://oral-boards.vercel.app/study/recap"
              />
              <ExternalLink label="Official ABPD OCE resources" href={sources.abpd} />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
