import { days, daySummary } from "@/lib/itinerary";

export function PrintItinerary() {
  return (
    <div className="hidden bg-white text-ink print:block print:text-print">
      {days.map((day) => (
        <section key={day.id} className="break-before-page first:break-before-auto">
          <p className="text-print-sm text-pine">Raleigh, together · Raleigh · October 2–6, 2026</p>
          <h1 className="my-2 font-display text-print-xl leading-tight">{day.title}</h1>
          <p className="mbe-2">{day.description}</p>
          <p className="mbe-2">
            {daySummary(day)}. Times are Eastern unless a flight time is marked PT or CT.
          </p>
          <p className="mbe-2">
            <strong>{day.takeaway}</strong>
          </p>
          {day.activities.map((activity) => (
            <article key={activity.id} className="break-inside-avoid border-bs border-line py-2">
              <h2 className="mbs-0 mbe-1 text-print-lg leading-tight font-semibold">
                {activity.time} · {activity.title}
              </h2>
              <p className="my-1 text-print-sm leading-snug">{activity.description}</p>
              {activity.details.map((detail) => (
                <p className="my-1 text-print-sm leading-snug" key={detail}>
                  {detail}
                </p>
              ))}
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
