import { daySpans, parseTime, type Day } from "@/lib/itinerary";

import { categoryTones } from "./category";

function position(minutes: number, from: number, to: number) {
  return `${(Math.min(Math.max(minutes, from), to) - from) / ((to - from) / 100)}%`;
}

function Segments({ day, from, to }: Readonly<{ day: Day; from: number; to: number }>) {
  return daySpans(day).map((span) => (
    <span
      key={span.id}
      className={`absolute inset-y-0 border-r-2 border-surface group-aria-selected:border-ink ${categoryTones[span.category].fill}`}
      style={{
        left: position(span.start, from, to),
        width: `calc(${position(span.end, from, to)} - ${position(span.start, from, to)})`,
      }}
    />
  ));
}

/** A compact, decorative shape of the day from 7 AM to 11 PM. */
export function DayRibbon({ day, className = "" }: Readonly<{ day: Day; className?: string }>) {
  return (
    <span className={`block ${className}`} aria-hidden="true">
      <span className="relative block h-1.5 overflow-hidden rounded-full bg-sunk group-aria-selected:bg-white/15">
        <Segments day={day} from={7 * 60} to={23 * 60} />
      </span>
    </span>
  );
}

export function DayRibbonLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1" aria-label="Activity colors">
      {Object.values(categoryTones).map((tone) => (
        <li className="eyebrow gap-1.5 text-[0.6875rem]" key={tone.label}>
          <span className={`size-2 rounded-full ${tone.fill}`} aria-hidden="true" />
          {tone.label}
        </li>
      ))}
    </ul>
  );
}

const hourTicks = [8, 10, 12, 14, 16, 18, 20];

function hourLabel(hour: number) {
  return `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? "a" : "p"}`;
}

/** Full-width day-of timeline with labeled milestones, 8 AM to 8 PM. */
export function DayOfTimeline({ day }: Readonly<{ day: Day }>) {
  const from = 8 * 60;
  const to = 20 * 60;
  const milestones = (day.milestones ?? []).flatMap((milestone) => {
    const parsed = parseTime(milestone.time);
    return parsed === null ? [] : [{ ...milestone, at: parsed.start }];
  });
  return (
    <figure className="card mt-6 p-5 sm:p-6">
      <figcaption className="flex items-baseline justify-between gap-4">
        <span className="eyebrow text-cardinal">Your day at a glance</span>
        <span className="eyebrow">Eastern time</span>
      </figcaption>
      <div className="relative mt-4 h-14" aria-hidden="true">
        {milestones.map((milestone, index) => (
          <span
            key={milestone.label}
            className={`absolute bottom-0 flex flex-col ${index % 2 === 0 ? "-translate-x-1/2 items-center" : "-translate-x-full items-end"}`}
            style={{ left: position(milestone.at, from, to) }}
          >
            <span
              className={`type-data text-xs font-medium whitespace-nowrap text-ink ${index % 2 === 0 ? "" : "pr-1"}`}
            >
              {milestone.time.replace(/\s?[AP]M/u, "")}
            </span>
            <span className={`w-px bg-ink ${index % 2 === 0 ? "h-8" : "h-2.5"}`} />
          </span>
        ))}
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-sunk" aria-hidden="true">
        <Segments day={day} from={from} to={to} />
      </div>
      <div className="relative mt-2 h-4" aria-hidden="true">
        {hourTicks.map((hour, index) => (
          <span
            key={hour}
            className={`type-data absolute text-[0.6875rem] text-muted ${index === 0 ? "" : index === hourTicks.length - 1 ? "-translate-x-full" : "-translate-x-1/2"}`}
            style={{ left: position(hour * 60, from, to) }}
          >
            {hourLabel(hour)}
          </span>
        ))}
      </div>
      <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 sm:grid-cols-4">
        {milestones.map((milestone) => (
          <li key={milestone.label}>
            <p className="type-data text-sm font-medium">{milestone.time}</p>
            <p className="text-sm text-muted">{milestone.label}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
