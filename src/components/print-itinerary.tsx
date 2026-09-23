import { days, daySummary } from "@/lib/itinerary";

export function PrintItinerary() {
  return (
    <div className="print-itinerary">
      {days.map((day) => (
        <section key={day.id} className="print-day">
          <p className="print-brand">Boards & beyond · Raleigh · October 2–6, 2026</p>
          <h1>{day.title}</h1>
          <p>{day.description}</p>
          <p>{daySummary(day)}. Times are Eastern unless a flight time is marked PT or CT.</p>
          <p>
            <strong>{day.takeaway}</strong>
          </p>
          {day.activities.map((activity) => (
            <article key={activity.id}>
              <h2>
                {activity.time} · {activity.title}
              </h2>
              <p>{activity.description}</p>
              {activity.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </article>
          ))}
          <p className="print-footnote">
            Sample itinerary. Flights supplied by you; hotel and exam confirmed in email. Outings
            and study blocks are suggestions. Follow current airline and ABPD instructions.
          </p>
        </section>
      ))}
    </div>
  );
}
