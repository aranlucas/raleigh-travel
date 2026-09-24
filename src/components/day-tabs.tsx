import type { KeyboardEvent } from "react";

import { days } from "@/lib/itinerary";

import { DayRibbon, DayRibbonLegend } from "./day-ribbon";

export function DayTabs({
  selectedId,
  onSelect,
}: Readonly<{ selectedId: string; onSelect: (id: string) => void }>) {
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") {
      next = (index + 1) % days.length;
    } else if (event.key === "ArrowLeft") {
      next = (index + days.length - 1) % days.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = days.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    onSelect(days[next].id);
    document.querySelector<HTMLButtonElement>(`#tab-${days[next].id}`)?.focus();
  }

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="eyebrow">October 2026</p>
        <DayRibbonLegend />
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5 sm:gap-2" role="tablist" aria-label="Trip day">
        {days.map((item, index) => {
          const isExam = item.id === "monday";
          return (
            <button
              type="button"
              id={`tab-${item.id}`}
              key={item.id}
              className={`group relative flex flex-col items-start overflow-hidden rounded-lg border bg-surface px-2.5 pt-2.5 pb-3 text-left text-ink transition-[background-color,border-color,box-shadow] duration-200 ease-out-soft hover:border-line-strong hover:shadow-card aria-selected:border-ink aria-selected:bg-ink aria-selected:text-white aria-selected:shadow-lift sm:px-4 sm:pt-3.5 sm:pb-4 ${isExam ? "border-cardinal/40" : "border-line"}`}
              role="tab"
              aria-selected={item.id === selectedId}
              aria-controls="daily-panel"
              tabIndex={item.id === selectedId ? 0 : -1}
              onClick={() => {
                onSelect(item.id);
              }}
              onKeyDown={(event) => {
                handleKey(event, index);
              }}
            >
              {isExam ? (
                <span className="absolute inset-x-0 top-0 h-1 bg-cardinal" aria-hidden="true" />
              ) : null}
              <span className="type-data text-[0.6875rem] font-medium tracking-[0.12em] text-muted group-aria-selected:text-white/70 sm:text-xs">
                {item.short}
              </span>
              <span
                className={`mt-1 font-display text-4xl leading-none tracking-tight sm:text-5xl lg:text-6xl ${isExam ? "text-cardinal group-aria-selected:text-white" : ""}`}
              >
                {Number(item.date)}
              </span>
              <span className="mt-2 hidden text-sm leading-snug text-ink-soft group-aria-selected:text-white/80 sm:block">
                {item.label}
              </span>
              {isExam ? (
                <span className="type-data mt-1 text-[0.6875rem] font-medium tracking-wider text-cardinal uppercase group-aria-selected:text-cardinal-wash sm:hidden">
                  Boards
                </span>
              ) : null}
              <DayRibbon day={item} className="mt-auto w-full pt-3 sm:pt-4" />
            </button>
          );
        })}
      </div>
    </>
  );
}
