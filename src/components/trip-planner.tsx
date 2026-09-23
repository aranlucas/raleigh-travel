"use client";

import { MapPin, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";

import { days } from "@/lib/itinerary";

import { PrintItinerary } from "./print-itinerary";
import { Timeline, type Filter } from "./timeline";
import { TripDetails } from "./trip-details";
import { TripSidebar } from "./trip-sidebar";
import { ToothMark } from "./ui";

export function TripPlanner() {
  const [dayId, setDayId] = useState("saturday");
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"itinerary" | "details">("itinerary");
  const contentRef = useRef<HTMLDivElement>(null);
  const day = days.find((item) => item.id === dayId);
  if (day === undefined) {
    throw new Error("Selected trip day is unavailable.");
  }

  function selectDay(id: string) {
    setDayId(id);
    setFilter("all");
  }
  function goTo(nextView: "itinerary" | "details", monday = false) {
    setView(nextView);
    if (monday) {
      selectDay("monday");
    }
    requestAnimationFrame(() =>
      contentRef.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      }),
    );
  }
  function handleDayKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
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
    selectDay(days[next].id);
    document.querySelector<HTMLButtonElement>(`#tab-${days[next].id}`)?.focus();
  }

  return (
    <>
      <div className="screen-app">
        <a className="skip-link" href="#trip-content">
          Skip to itinerary
        </a>
        <header className="site-header">
          <div className="header-inner">
            <Link className="brand" href="/" aria-label="Boards and beyond, home">
              <ToothMark />
              <span>Boards & beyond</span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <button
                type="button"
                aria-current={view === "itinerary" ? "page" : undefined}
                onClick={() => {
                  setView("itinerary");
                }}
              >
                Itinerary
              </button>
              <button
                type="button"
                aria-current={view === "details" ? "page" : undefined}
                onClick={() => {
                  setView("details");
                }}
              >
                Trip details
              </button>
              <Link href="/study">Study guide</Link>
            </nav>
            <button
              type="button"
              className="print-button"
              aria-label="Print itinerary"
              onClick={() => {
                window.print();
              }}
            >
              <Printer size={18} strokeWidth={1.6} aria-hidden="true" />
              <span>Print itinerary</span>
            </button>
          </div>
        </header>
        <main className="page-shell">
          <section className="hero" aria-label="Raleigh pediatric boards trip">
            <div className="hero-copy">
              <h1>
                Little patients.
                <br />
                Big milestone.
              </h1>
              <p className="hero-description">
                Your pediatric dental boards weekend in Raleigh—with space to prepare, explore, and
                celebrate.
              </p>
              <p className="trip-date">
                October 2–6, 2026 <span aria-hidden="true">·</span> Raleigh, North Carolina
              </p>
            </div>
            <figure className="hero-art">
              <Image
                src="/raleigh-watercolor.png"
                alt="Watercolor illustration of Raleigh’s skyline framed by oak trees in soft autumn colors"
                fill
                sizes="(max-width: 700px) 100vw, 60vw"
                preload
              />
              <figcaption>A change of scenery. A little breathing room.</figcaption>
            </figure>
          </section>
          <div ref={contentRef} id="trip-content" className="trip-content" tabIndex={-1}>
            {view === "itinerary" ? (
              <>
                <div className="day-tabs" role="tablist" aria-label="Trip day">
                  {days.map((item, index) => (
                    <button
                      type="button"
                      id={`tab-${item.id}`}
                      key={item.id}
                      role="tab"
                      aria-selected={item.id === dayId}
                      aria-controls="daily-panel"
                      tabIndex={item.id === dayId ? 0 : -1}
                      onClick={() => {
                        selectDay(item.id);
                      }}
                      onKeyDown={(event) => {
                        handleDayKey(event, index);
                      }}
                    >
                      <span className="tab-date">
                        {item.short} {item.date}
                      </span>
                      <span className="tab-label">{item.label}</span>
                      {item.id === "monday" ? (
                        <span className="board-dot" aria-hidden="true" />
                      ) : null}
                    </button>
                  ))}
                </div>
                <div className="plan-layout">
                  <Timeline key={day.id} day={day} filter={filter} onFilterChange={setFilter} />
                  <TripSidebar
                    onMonday={() => {
                      goTo("itinerary", true);
                    }}
                    onDetails={() => {
                      goTo("details");
                    }}
                  />
                </div>
              </>
            ) : (
              <TripDetails />
            )}
          </div>
          <footer className="site-footer">
            <span className="footer-brand">
              <ToothMark />
              For the little smiles. And this big moment.
            </span>
            <span>
              <MapPin size={14} aria-hidden="true" />
              Raleigh, NC · October 2026
            </span>
          </footer>
        </main>
      </div>
      <PrintItinerary />
    </>
  );
}
