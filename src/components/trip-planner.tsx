"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { days } from "@/lib/itinerary";
import { selectedDayId } from "@/lib/selected-day";

import { DayTabs } from "./day-tabs";
import type { Filter } from "./timeline";
import { TripSidebar } from "./trip-sidebar";
import { TripWeather } from "./trip-weather";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);

  return () => {
    window.removeEventListener("hashchange", onChange);
  };
}

const readHash = () => window.location.hash.slice(1);

const readSelectedDay = () => selectedDayId(readHash());

// Keep the prerender and initial hydration consistent; resolve today's date in the browser.
const serverSelectedDay = () => "saturday";

/** The selected day lives in the URL hash (`/#monday`) so other pages can link to a day. */
function useSelectedDay() {
  const id = useSyncExternalStore(subscribeToHash, readSelectedDay, serverSelectedDay);
  const day = days.find((item) => item.id === id);

  if (day === undefined) {
    throw new Error("Selected trip day is unavailable.");
  }

  return day;
}

function setDayHash(id: string) {
  window.history.replaceState(null, "", `#${id}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function TripPlanner() {
  const day = useSelectedDay();
  const [filter, setFilter] = useState<Filter>("all");
  const contentRef = useRef<HTMLDivElement>(null);

  function scrollToDay() {
    requestAnimationFrame(() =>
      contentRef.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      }),
    );
  }

  useEffect(() => {
    if (days.some((item) => item.id === readHash())) {
      contentRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, []);

  function selectDay(id: string) {
    setDayHash(id);
    setFilter("all");
  }

  function showMonday() {
    selectDay("monday");
    scrollToDay();
  }

  return (
    <div ref={contentRef} id="trip-content" className="scroll-mbs-6" tabIndex={-1}>
      <DayTabs selectedId={day.id} onSelect={selectDay} />
      <div className="mbs-10 grid grid-cols-1 items-start gap-10 md:grid-plan lg:grid-plan-wide lg:gap-14">
        <TripWeather day={day} filter={filter} onFilterChange={setFilter} />
        <TripSidebar onMonday={showMonday} />
      </div>
    </div>
  );
}
