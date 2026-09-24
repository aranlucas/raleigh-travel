import { days, daySummary } from "@/lib/itinerary";

export function PrintItinerary() {
  return (
    <div className="hidden bg-white text-slate-900 print:block print:text-[10pt]">
      {days.map((day) => (
        <section key={day.id} className="break-before-page first:break-before-auto">
          <p className="text-[9pt] text-emerald-700">
            Boards & beyond · Raleigh · October 2–6, 2026
          </p>
          <h1 className="my-2 text-[28pt] font-medium leading-tight">{day.title}</h1>
          <p className="mb-2">{day.description}</p>
          <p className="mb-2">
            {daySummary(day)}. Times are Eastern unless a flight time is marked PT or CT.
          </p>
          <p className="mb-2">
            <strong>{day.takeaway}</strong>
          </p>
          {day.activities.map((activity) => (
            <article
              key={activity.id}
              className="break-inside-avoid border-t border-slate-200 py-2"
            >
              <h2 className="mt-0 mb-1 text-[14pt] font-semibold leading-tight">
                {activity.time} · {activity.title}
              </h2>
              <p className="my-1 text-[9pt] leading-snug">{activity.description}</p>
              {activity.details.map((detail) => (
                <p className="my-1 text-[9pt] leading-snug" key={detail}>
                  {detail}
                </p>
              ))}
            </article>
          ))}
          <p className="border-t border-slate-200 pt-2 text-[8pt] text-emerald-700">
            Sample itinerary. Flights supplied by you; hotel and exam confirmed in email. Outings
            and study blocks are suggestions. Follow current airline and ABPD instructions.
          </p>
        </section>
      ))}
    </div>
  );
}
