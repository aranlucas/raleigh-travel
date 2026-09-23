import { ChevronRight, Leaf } from "lucide-react";

import { daySummary, type Activity, type Day } from "@/lib/itinerary";

import { ExternalLink } from "./ui";

export type Filter = "all" | "study" | "explore";
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All plans" },
  { value: "study", label: "Study" },
  { value: "explore", label: "Explore" },
];

function ActivityRow({ activity }: Readonly<{ activity: Activity }>) {
  return (
    <li className={`activity activity-${activity.category}`}>
      <details>
        <summary>
          <span className="activity-time">{activity.time.replaceAll(" ", "\u00A0")}</span>
          <span className="timeline-node" aria-hidden="true" />
          <span className={`category category-${activity.category}`}>{activity.category}</span>
          <span className="activity-copy">
            <span className="activity-title">{activity.title}</span>
            <span className="activity-description">{activity.description}</span>
          </span>
          <ChevronRight className="disclosure" size={18} aria-hidden="true" />
        </summary>
        <div className="activity-detail">
          {activity.details.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
          {activity.links ? (
            <div className="detail-links">
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
      className="daily-plan"
      role="tabpanel"
      id="daily-panel"
      aria-labelledby={`tab-${day.id}`}
      tabIndex={0}
    >
      <div className="day-heading">
        <h2>{day.title}</h2>
        <span className="day-summary">{daySummary(day)}</span>
      </div>
      <p className="day-description">{day.description}</p>
      <fieldset className="filters">
        <legend className="sr-only">Filter activities</legend>
        {filters.map((option) => (
          <button
            key={option.value}
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
        <ol className="timeline">
          {activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </ol>
      ) : (
        <div className="empty-state">
          <Leaf size={25} aria-hidden="true" />
          <h3>
            {filter === "study" ? "The notes can stay closed." : "A little space in the day."}
          </h3>
          <p>
            {filter === "study"
              ? "No study blocks today. Enjoy the change of pace."
              : "No sightseeing scheduled today. Keep your energy for the rest of the plan."}
          </p>
          <button
            className="text-button"
            type="button"
            onClick={() => {
              onFilterChange("all");
            }}
          >
            See all plans
          </button>
        </div>
      )}
      <div className="day-takeaway">
        <Leaf size={19} aria-hidden="true" />
        <p>{day.takeaway}</p>
      </div>
    </section>
  );
}
