"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { days } from "@/lib/itinerary";

import { DayTabs } from "./day-tabs";
import { PrintItinerary } from "./print-itinerary";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Timeline, type Filter } from "./timeline";
import { TripDetails } from "./trip-details";
import { TripHero } from "./trip-hero";
import { TripSidebar } from "./trip-sidebar";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
  };
}
const readHash = () => window.location.hash.slice(1);
const noHash = () => "";

/** The selected day lives in the URL hash (`/#monday`) so other pages can link to a day. */
function useSelectedDay() {
  const hash = useSyncExternalStore(subscribeToHash, readHash, noHash);
  const day = days.find((item) => item.id === hash) ?? days.find((item) => item.id === "saturday");
  if (day === undefined) {
    throw new Error("Selected trip day is unavailable.");
  }
  return day;
}

function setDayHash(id: string) {
  window.history.replaceState(null, "", `#${id}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function TripPlanner({ view }: Readonly<{ view: "itinerary" | "details" }>) {
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
  // Arriving from another page's day link: bring the day into view.
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
    <>
      <div className="print:hidden">
        <a className="skip-link" href="#trip-content">
          Skip to itinerary
        </a>
        <SiteHeader current={view} />
        <main className="page-shell">
          <TripHero />
          <div ref={contentRef} id="trip-content" className="scroll-mt-6" tabIndex={-1}>
            {view === "itinerary" ? (
              <>
                <DayTabs selectedId={day.id} onSelect={selectDay} />
                <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_19rem] lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
                  <Timeline key={day.id} day={day} filter={filter} onFilterChange={setFilter} />
                  <TripSidebar onMonday={showMonday} />
                </div>
              </>
            ) : (
              <TripDetails />
            )}
          </div>
          <SiteFooter />
        </main>
      </div>
      <PrintItinerary />
    </>
  );
}
