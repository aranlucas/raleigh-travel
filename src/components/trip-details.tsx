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
    <div className="flight-leg">
      <div>
        <span className="airport">{from}</span>
        <strong>{depart}</strong>
      </div>
      <div className="flight-connector">
        <span>{flight}</span>
        <ArrowRight size={24} strokeWidth={1} aria-hidden="true" />
      </div>
      <div>
        <span className="airport">{to}</span>
        <strong>{arrive}</strong>
      </div>
    </div>
  );
}

export function TripDetails() {
  const totalStudy = days.reduce((total, day) => total + studyMinutes(day), 0);
  return (
    <section className="trip-details" aria-labelledby="details-heading">
      <div className="section-intro">
        <h2 id="details-heading">The details, taken care of.</h2>
        <p>Confirmed travel, a protected board day, and a plan with room to breathe.</p>
      </div>
      <div className="details-grid">
        <section className="detail-section">
          <div className="section-label">
            <Plane size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3>Getting there</h3>
          </div>
          <p className="detail-date">Friday, October 2 · 7 hrs 14 mins</p>
          <FlightLeg flight="AA 381" from="SEA" to="CLT" depart="6:40 AM PT" arrive="2:50 PM ET" />
          <p className="connection">1 hr 8 min connection in Charlotte</p>
          <FlightLeg flight="AA 1894" from="CLT" to="RDU" depart="3:58 PM ET" arrive="4:54 PM ET" />
          <p className="detail-footnote">
            Suggested SEA arrival: 4:40 AM Pacific. Hotel arrival around 6 PM Eastern.
          </p>
        </section>
        <section className="detail-section">
          <div className="section-label">
            <Plane size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3>Coming home</h3>
          </div>
          <p className="detail-date">Tuesday, October 6 · 8 hrs 31 mins</p>
          <FlightLeg flight="AA 2693" from="RDU" to="DFW" depart="2:13 PM ET" arrive="4:30 PM CT" />
          <p className="connection short-connection">Short connection · 51 minutes in Dallas</p>
          <FlightLeg flight="AA 1483" from="DFW" to="SEA" depart="5:21 PM CT" arrive="7:44 PM PT" />
          <p className="detail-footnote">
            Leave the hotel around 11 AM; target RDU by 11:45 AM. At DFW, head to your onward gate
            first.
          </p>
        </section>
        <section className="detail-section">
          <div className="section-label">
            <House size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3>A comfortable home base</h3>
          </div>
          <h4>Hyatt House Raleigh North Hills</h4>
          <p>
            160 Park at North Hills Street
            <br />
            Raleigh, NC 27609
          </p>
          <dl className="facts">
            <div>
              <dt>Stay</dt>
              <dd>October 2–6 · 4 nights</dd>
            </div>
            <div>
              <dt>Room</dt>
              <dd>1 king bed · 2 guests</dd>
            </div>
            <div>
              <dt>Check-in</dt>
              <dd>Friday from 3 PM</dd>
            </div>
            <div>
              <dt>Checkout</dt>
              <dd>Tuesday by noon</dd>
            </div>
          </dl>
          <p className="detail-footnote">
            Bring photo ID and a card for incidentals. Planned Tuesday checkout is 10:45 AM.
          </p>
          <div className="detail-links">
            <ExternalLink label="Directions" href={maps(hotelAddress)} />
          </div>
        </section>
        <section className="detail-section board-details">
          <div className="section-label">
            <CalendarDays size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3>The milestone</h3>
          </div>
          <h4>ABPD Oral Clinical Examination</h4>
          <p>
            Monday, October 5 · Session 3<br />
            AIME Center · 4208 Six Forks Road
          </p>
          <dl className="facts">
            <div>
              <dt>Personal buffer</dt>
              <dd>2:00 PM</dd>
            </div>
            <div>
              <dt>Leave the hotel</dt>
              <dd>About 2:25 PM</dd>
            </div>
            <div>
              <dt>Registration</dt>
              <dd>2:45 PM</dd>
            </div>
            <div>
              <dt>Hotel return</dt>
              <dd>About 6:15 PM</dd>
            </div>
          </dl>
          <p className="detail-footnote">
            Wait in the lobby for the ABPD representative. Registration will not open early. The
            email’s session times are tentative; follow the latest official instructions.
          </p>
          <div className="detail-links">
            <ExternalLink label="Official ABPD exam information" href={sources.abpd} />
            <ExternalLink label="Directions" href={maps(examAddress)} />
          </div>
        </section>
      </div>
      <section className="study-plan">
        <div className="section-label">
          <BookOpen size={23} strokeWidth={1.5} aria-hidden="true" />
          <h3>A little structure for studying</h3>
        </div>
        <p className="study-total">
          {duration(totalStudy)} of focused preparation
          <span> + an optional 30 minutes on Friday’s flight</span>
        </p>
        <div className="study-days">
          {days
            .filter((day) => studyMinutes(day) > 0)
            .map((day) => (
              <div key={day.id}>
                <strong>{day.short}</strong>
                <span>{duration(studyMinutes(day))}</span>
                <p>
                  {day.id === "saturday"
                    ? "Clinical cases & weak areas"
                    : day.id === "sunday"
                      ? "Rehearsal & a final recap"
                      : "Light review, then switch off"}
                </p>
              </div>
            ))}
        </div>
        <p className="detail-footnote">
          Practice your reasoning out loud, including how you would explain decisions to a child’s
          family. Topics here are suggestions to organize your own materials, not a complete exam
          blueprint or clinical guidance.
        </p>
        <div className="detail-links">
          <ExternalLink label="Open your study guide" href="/study" />
          <ExternalLink label="One-page recap" href="/study/recap" />
          <ExternalLink label="Official ABPD OCE resources" href={sources.abpd} />
        </div>
      </section>
      <section className="source-notes">
        <h3>Where the plan comes from</h3>
        <p>
          Hotel and exam logistics come from the Gmail confirmations reviewed September 23, 2026.
          You supplied the flight schedules and confirmed that 2 PM is a personal buffer. Flight
          status is not live. Meals, study blocks, transfers, and outings are suggestions; no
          restaurant reservations have been made. Meal choices favor local restaurants and value;
          budgets are per-person estimates for food before tax, tip, and drinks.
        </p>
        <p>
          Flight times are local to each airport: PT in Seattle, CT in Dallas, ET in Charlotte and
          Raleigh. All other itinerary times are Eastern. Visitor hours were checked September 23;
          review the linked venue pages before going. Personal names, booking identifiers, and
          private email links are omitted from this public version.
        </p>
        <div className="detail-links">
          <ExternalLink label="Science museum" href={sources.science} />
          <ExternalLink label="State Capitol" href={sources.capitol} />
          <ExternalLink label="Art museum" href={sources.art} />
          <ExternalLink label="Restaurant menus" href={sources.vivace} />
        </div>
      </section>
    </section>
  );
}
