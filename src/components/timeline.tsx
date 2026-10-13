import { ChevronRight, Leaf } from "lucide-react";

import { daySummary, type Activity, type Day } from "@/lib/itinerary";

import { categoryTones } from "./category";
import { DayOfTimeline } from "./day-ribbon";
import { ExternalLink } from "./ui";

export type Filter = "all" | "study" | "explore";

type FilterOption = { value: Filter; label: string };

const filters: FilterOption[] = [
  { value: "all", label: "All plans" },
  { value: "study", label: "Study" },
  { value: "explore", label: "Explore" },
];

type ActivityRowProps = Readonly<{ activity: Activity }>;

function ActivityRow({ activity }: ActivityRowProps) {
  const category = categoryTones[activity.category];
  const [start, end] = activity.time.split("–");

  return (
    <li className="relative border-be border-line before:pointer-events-none before:absolute before:inset-y-0 before:timeline-axis before:w-px before:bg-line before:content-empty first:before:inset-bs-8 last:border-be-0 last:before:inset-be-auto last:before:h-8 sm:before:timeline-axis-wide">
      <details className="group/details">
        <summary className="group/summary grid grid-activity items-start gap-x-3 py-5 sm:grid-activity-wide sm:gap-x-5 sm:py-6">
          <span className="flex flex-col pbs-1.5 type-data text-meta leading-snug text-ink-soft sm:text-sm">
            <span>{start}</span>
            {end === undefined ? null : <span className="text-muted">–{end}</span>}
          </span>
          <span
            className={`relative z-1 mbs-2.5 size-3 rounded-full ring-4 ${activity.category === "exam" ? "ring-cardinal-wash" : "ring-canvas"} ${category.fill}`}
            aria-hidden="true"
          />
          <span className="flex min-w-0 flex-col">
            <span className={`eyebrow text-label ${category.text}`}>{activity.category}</span>
            <span className="mbs-1 font-display text-xl leading-snug tracking-tight transition-colors group-hover/summary:text-pine sm:text-2xl">
              {activity.title}
            </span>
            <span className="mbs-1 text-body-sm leading-normal text-muted">
              {activity.description}
            </span>
          </span>
          <ChevronRight
            className="mbs-7 text-muted transition-transform duration-200 group-open/details:rotate-90"
            size={16}
            aria-hidden="true"
          />
        </summary>
        <div className="ps-28 pe-4 pbe-6 text-body-sm leading-relaxed text-ink-soft sm:ps-45">
          {activity.details.map((detail, index) => (
            <p className={index > 0 ? "mbs-2" : undefined} key={detail}>
              {detail}
            </p>
          ))}
          {activity.links ? (
            <div className="mbs-4 flex flex-wrap gap-x-6 gap-y-2">
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

type TimelineProps = Readonly<{
  day: Day;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  weather?: React.ReactNode;
}>;

export function Timeline({ day, filter, onFilterChange, weather }: TimelineProps) {
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
      <p className="eyebrow text-label text-muted">{daySummary(day)}</p>
      <h2 className="mbs-3 type-title">{day.title}</h2>
      <p className="mbs-2 type-lead">{day.description}</p>
      {day.milestones === undefined ? null : <DayOfTimeline day={day} />}
      {weather}
      <fieldset className="mbs-6 mbe-4 flex min-w-0 flex-wrap gap-2">
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
        <div className="mbs-4 panel px-6 py-12 text-center">
          <Leaf className="mx-auto text-pine" size={24} aria-hidden="true" />
          <h3 className="mbs-3 type-heading">
            {filter === "study" ? "No study blocks today." : "No sightseeing today."}
          </h3>
          <div className="mbs-5" />
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
      <div className="mbs-6 flex items-start gap-3 border-bs border-line pbs-6 text-pine-deep">
        <Leaf className="mbs-1.5" size={18} aria-hidden="true" />
        <p className="font-display text-xl leading-snug text-balance">{day.takeaway}</p>
      </div>
    </section>
  );
}
