"use client";

import { useRef, useState } from "react";

import { days } from "@/lib/itinerary";

import { DayTabs } from "./day-tabs";
import { PrintItinerary } from "./print-itinerary";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Timeline, type Filter } from "./timeline";
import { TripDetails } from "./trip-details";
import { TripHero } from "./trip-hero";
import { TripSidebar } from "./trip-sidebar";

export function TripPlanner({ view }: Readonly<{ view: "itinerary" | "details" }>) {
  const [dayId, setDayId] = useState("saturday");
  const [filter, setFilter] = useState<Filter>("all");
  const contentRef = useRef<HTMLDivElement>(null);
  const day = days.find((item) => item.id === dayId);
  if (day === undefined) {
    throw new Error("Selected trip day is unavailable.");
  }

  function selectDay(id: string) {
    setDayId(id);
    setFilter("all");
  }
  function showMonday() {
    selectDay("monday");
    requestAnimationFrame(() =>
      contentRef.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      }),
    );
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
                <DayTabs selectedId={dayId} onSelect={selectDay} />
                <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_19rem] lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
                  <Timeline key={day.id} day={day} filter={filter} onFilterChange={setFilter} />
                  <TripSidebar onMonday={showMonday} />
                </div>
              </>
            ) : (
              <TripDetails />
            )}
          </div>
          <SiteFooter tagline="For the little smiles. And this big moment." />
        </main>
      </div>
      <PrintItinerary />
    </>
  );
}
