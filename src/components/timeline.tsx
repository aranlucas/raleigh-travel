import { ChevronRight, Leaf } from "lucide-react";

import { daySummary, type Activity, type Category, type Day } from "@/lib/itinerary";

import { ExternalLink } from "./ui";

export type Filter = "all" | "study" | "explore";
const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All plans" },
  { value: "study", label: "Study" },
  { value: "explore", label: "Explore" },
];

const categoryStyles: Record<Category, { label: string; node: string }> = {
  study: { label: "bg-emerald-100 text-emerald-700", node: "bg-emerald-600" },
  explore: { label: "bg-emerald-100 text-emerald-700", node: "bg-emerald-600" },
  reset: { label: "bg-amber-100 text-amber-800", node: "bg-amber-500" },
  travel: { label: "bg-sky-100 text-sky-800", node: "bg-sky-700" },
  exam: { label: "bg-emerald-800 text-white", node: "bg-emerald-800" },
};

const focusClasses =
  "focus-visible:outline-2 focus-visible:outline-amber-700 focus-visible:outline-offset-[5px] focus-visible:rounded-sm";
const linkGroupClasses = "flex flex-wrap gap-x-6 gap-y-3 mt-4";
const textButtonClasses =
  "inline-flex items-center gap-2 p-0 text-sm font-medium leading-normal text-emerald-700 underline decoration-1 underline-offset-4 transition-colors motion-reduce:transition-none hover:text-amber-700";

function ActivityRow({ activity }: Readonly<{ activity: Activity }>) {
  const category = categoryStyles[activity.category];

  return (
    <li
      className={
        "relative border-b border-slate-200 before:pointer-events-none before:absolute before:inset-y-0 before:left-[104px] before:w-px before:bg-emerald-100 before:content-[''] last:border-b-0 last:before:bottom-[52%] sm:before:left-[126px] md:before:left-[107px] lg:before:left-[134px] xl:before:left-[158px]"
      }
    >
      <details className="group/details">
        <summary
          className={`group/summary relative grid cursor-pointer list-none grid-cols-[108px_12px_70px_minmax(0,1fr)_14px] items-start gap-x-3 px-0 py-6 pr-1 [&::-webkit-details-marker]:hidden ${focusClasses} max-sm:grid-cols-[88px_12px_minmax(0,1fr)_12px] max-sm:gap-x-2 max-sm:py-5 md:grid-cols-[91px_12px_minmax(0,1fr)_12px] md:gap-x-2 lg:grid-cols-[116px_12px_minmax(0,1fr)_14px] lg:gap-x-3 xl:grid-cols-[137px_14px_76px_minmax(0,1fr)_16px] xl:gap-x-4`}
        >
          <span className="pt-2 text-sm font-semibold leading-normal tabular-nums">
            {activity.time.replaceAll(" ", "\u00A0")}
          </span>
          <span
            className={`z-[1] mt-2 size-3 rounded-full outline-3 outline-slate-50 ${category.node}`}
            aria-hidden="true"
          />
          <span
            className={`mt-1 inline-flex w-fit min-w-[52px] items-center justify-center rounded-md px-2 pt-1 pb-0 text-sm font-semibold leading-normal tracking-wide uppercase max-sm:col-start-3 max-sm:col-end-4 max-sm:mt-0 max-sm:mb-1 md:col-start-3 md:col-end-4 xl:col-auto xl:min-w-[61px] ${category.label}`}
          >
            {activity.category}
          </span>
          <span className="flex min-w-0 flex-col max-sm:col-start-3 max-sm:col-end-4 md:col-start-3 md:col-end-4 xl:col-auto">
            <span className="text-2xl font-semibold leading-normal tracking-tight transition-colors motion-reduce:transition-none group-hover/summary:text-emerald-700">
              {activity.title}
            </span>
            <span className="mt-1 text-sm leading-normal text-slate-600">
              {activity.description}
            </span>
          </span>
          <ChevronRight
            className={`mt-2 transition-transform motion-reduce:transition-none group-open/details:rotate-90 max-sm:col-start-4 max-sm:col-end-5 max-sm:row-start-1 max-sm:row-end-3 md:col-start-4 md:col-end-5 md:row-start-1 md:row-end-3 xl:col-auto xl:row-auto ${focusClasses}`}
            size={18}
            aria-hidden="true"
          />
        </summary>
        <div className="relative px-7 pb-6 pl-[144px] text-sm leading-relaxed text-emerald-700 max-sm:pr-0 max-sm:pl-[120px] md:pl-[120px] lg:pl-[152px] xl:pl-[182px]">
          {activity.details.map((detail, index) => (
            <p className={index > 0 ? "mt-2" : undefined} key={detail}>
              {detail}
            </p>
          ))}
          {activity.links ? (
            <div className={linkGroupClasses}>
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
      className="min-w-0"
      role="tabpanel"
      id="daily-panel"
      aria-labelledby={`tab-${day.id}`}
      tabIndex={0}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 max-sm:gap-1">
        <h2 className="text-4xl font-medium leading-tight tracking-tight">{day.title}</h2>
        <span className="text-sm whitespace-nowrap">{daySummary(day)}</span>
      </div>
      <p className="mt-2 text-base text-slate-600">{day.description}</p>
      <fieldset className="m-0 flex min-w-0 gap-2 border-0 p-0 mt-5 mb-6 xl:gap-3">
        <legend className="sr-only">Filter activities</legend>
        {filters.map((option) => (
          <button
            key={option.value}
            className={`min-w-[76px] rounded-md border border-emerald-300 px-3 py-2 text-sm leading-normal transition-colors motion-reduce:transition-none hover:bg-emerald-50 aria-pressed:border-slate-900 aria-pressed:bg-slate-900 aria-pressed:text-white aria-pressed:hover:bg-slate-900 ${focusClasses} xl:min-w-[96px] xl:px-4`}
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
        <ol className="m-0 list-none p-0">
          {activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </ol>
      ) : (
        <div className="rounded-md bg-emerald-50 px-6 py-12 text-center">
          <Leaf className="mx-auto text-slate-600" size={25} aria-hidden="true" />
          <h3 className="mt-2 text-3xl font-medium">
            {filter === "study" ? "The notes can stay closed." : "A little space in the day."}
          </h3>
          <p className="mx-auto mt-2 mb-4 max-w-80 text-sm text-slate-600">
            {filter === "study"
              ? "No study blocks today. Enjoy the change of pace."
              : "No sightseeing scheduled today. Keep your energy for the rest of the plan."}
          </p>
          <button
            className={`${textButtonClasses} ${focusClasses}`}
            type="button"
            onClick={() => {
              onFilterChange("all");
            }}
          >
            See all plans
          </button>
        </div>
      )}
      <div className="mt-6 flex items-start gap-3 border-t border-slate-200 pt-6 text-emerald-700">
        <Leaf className="mt-1" size={19} aria-hidden="true" />
        <p className="text-xl font-medium leading-normal">{day.takeaway}</p>
      </div>
    </section>
  );
}
