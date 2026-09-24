import { ChevronRight, Leaf } from "lucide-react";

import { daySummary, type Activity, type Day } from "@/lib/itinerary";

import { categoryTones } from "./category";
import { DayOfTimeline } from "./day-ribbon";
import { ExternalLink } from "./ui";

export type Filter = "all" | "study" | "explore";
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All plans" },
  { value: "study", label: "Study" },
  { value: "explore", label: "Explore" },
];

function ActivityRow({ activity }: Readonly<{ activity: Activity }>) {
  const category = categoryTones[activity.category];
  const [start, end] = activity.time.split("–");

  return (
    <li className="relative border-b border-line before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-[calc(5.5rem+5.5px)] before:w-px before:bg-line before:content-[''] first:before:top-8 last:border-b-0 last:before:bottom-auto last:before:h-8 sm:before:left-[calc(9.25rem+5.5px)]">
      <details className="group/details">
        <summary className="group/summary grid grid-cols-[4.75rem_0.75rem_minmax(0,1fr)_1rem] items-start gap-x-3 py-5 sm:grid-cols-[8rem_0.75rem_minmax(0,1fr)_1rem] sm:gap-x-5 sm:py-6">
          <span className="type-data flex flex-col pt-1.5 text-[0.8125rem] leading-snug text-ink-soft sm:text-sm">
            <span>{start}</span>
            {end === undefined ? null : <span className="text-muted">–{end}</span>}
          </span>
          <span
            className={`relative z-[1] mt-2.5 size-3 rounded-full ring-4 ${activity.category === "exam" ? "ring-cardinal-wash" : "ring-canvas"} ${category.fill}`}
            aria-hidden="true"
          />
          <span className="flex min-w-0 flex-col">
            <span className={`eyebrow ${category.text}`}>{activity.category}</span>
            <span className="mt-1 font-display text-xl leading-snug tracking-tight transition-colors group-hover/summary:text-pine sm:text-2xl">
              {activity.title}
            </span>
            <span className="mt-1 text-[0.9375rem] leading-normal text-muted">
              {activity.description}
            </span>
          </span>
          <ChevronRight
            className="mt-7 text-muted transition-transform duration-200 group-open/details:rotate-90"
            size={16}
            aria-hidden="true"
          />
        </summary>
        <div className="pr-4 pb-6 pl-[7rem] text-[0.9375rem] leading-relaxed text-ink-soft sm:pl-[11.25rem]">
          {activity.details.map((detail, index) => (
            <p className={index > 0 ? "mt-2" : undefined} key={detail}>
              {detail}
            </p>
          ))}
          {activity.links ? (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {activity.links.map((link) => (
                <ExternalLink key={link.href} {...link} />
              ))}
            </div>
          ) : null}
        </div>
      </details>
    </li>
  );
}

export function Timeline({
  day,
  filter,
  onFilterChange,
}: Readonly<{
  day: Day;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}>) {
  const activities = day.activities.filter(
    (activity) => filter === "all" || activity.category === filter,
  );
  return (
    <section
      className="min-w-0 animate-fade-up"
      role="tabpanel"
      id="daily-panel"
      aria-labelledby={`tab-${day.id}`}
      tabIndex={0}
    >
      <p className="eyebrow">{daySummary(day)}</p>
      <h2 className="type-title mt-3">{day.title}</h2>
      <p className="type-lead mt-2">{day.description}</p>
      {day.milestones === undefined ? null : <DayOfTimeline day={day} />}
      <fieldset className="mt-6 mb-4 flex min-w-0 flex-wrap gap-2">
        <legend className="sr-only">Filter activities</legend>
        {filters.map((option) => (
          <button
            key={option.value}
            className="chip"
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => {
              onFilterChange(option.value);
            }}
          >
            {option.label}
          </button>
        ))}
      </fieldset>
      <div aria-live="polite" className="sr-only">
        {activities.length} {filter === "all" ? "planned" : filter} activities for {day.title}
      </div>
      {activities.length > 0 ? (
        <ol className="list-none">
          {activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </ol>
      ) : (
        <div className="panel mt-4 px-6 py-12 text-center">
          <Leaf className="mx-auto text-pine" size={24} aria-hidden="true" />
          <h3 className="type-heading mt-3">
            {filter === "study" ? "The notes can stay closed." : "A little space in the day."}
          </h3>
          <p className="mx-auto mt-2 mb-5 max-w-80 text-[0.9375rem] text-muted">
            {filter === "study"
              ? "No study blocks today. Enjoy the change of pace."
              : "No sightseeing scheduled today. Keep your energy for the rest of the plan."}
          </p>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              onFilterChange("all");
            }}
          >
            See all plans
          </button>
        </div>
      )}
      <div className="mt-6 flex items-start gap-3 border-t border-line pt-6 text-pine-deep">
        <Leaf className="mt-1.5" size={18} aria-hidden="true" />
        <p className="font-display text-xl leading-snug text-balance">{day.takeaway}</p>
      </div>
    </section>
  );
}
