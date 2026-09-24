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

const focusClasses =
  "focus-visible:outline-2 focus-visible:outline-amber-700 focus-visible:outline-offset-[5px] focus-visible:rounded-sm";
const navLinkClasses =
  "relative inline-flex items-center py-2 pb-3 text-sm no-underline after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:bg-transparent after:content-[''] hover:after:bg-emerald-600 aria-[current=page]:font-semibold aria-[current=page]:after:bg-emerald-600 md:py-0 md:pb-0";

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
      <div className="print:hidden">
        <a
          className={`fixed top-[-80px] left-5 z-10 bg-slate-900 px-5 py-3 text-white focus:top-3 ${focusClasses}`}
          href="#trip-content"
        >
          Skip to itinerary
        </a>
        <header className="mx-5 border-b border-slate-200 sm:mx-6">
          <div className="mx-auto flex min-h-[105px] max-w-[1392px] flex-wrap items-center justify-between gap-0 px-0 pt-4 md:min-h-[72px] md:flex-nowrap md:gap-6 md:px-5 md:pt-0">
            <Link
              className={`order-0 inline-flex items-center gap-2 text-3xl font-semibold leading-normal tracking-tight md:gap-4 md:text-2xl lg:text-3xl max-[400px]:text-2xl ${focusClasses}`}
              href="/"
              aria-label="Boards and beyond, home"
            >
              <ToothMark className="shrink-0 max-md:h-[33px] max-md:w-[29px]" />
              <span>Boards & beyond</span>
            </Link>
            <nav
              className="order-2 mt-3 flex w-full gap-7 self-stretch md:order-none md:mt-0 md:w-auto md:gap-6 lg:gap-9"
              aria-label="Main navigation"
            >
              <button
                type="button"
                className={`${navLinkClasses} ${focusClasses}`}
                aria-current={view === "itinerary" ? "page" : undefined}
                onClick={() => {
                  setView("itinerary");
                }}
              >
                Itinerary
              </button>
              <button
                type="button"
                className={`${navLinkClasses} ${focusClasses}`}
                aria-current={view === "details" ? "page" : undefined}
                onClick={() => {
                  setView("details");
                }}
              >
                Trip details
              </button>
              <Link className={`${navLinkClasses} ${focusClasses}`} href="/study">
                Study guide
              </Link>
            </nav>
            <button
              type="button"
              className={`order-1 ml-auto flex min-h-[39px] min-w-[39px] items-center justify-center gap-2 rounded-lg border border-emerald-300 px-2 py-2 text-sm font-semibold transition-colors hover:bg-emerald-50 md:order-none md:ml-0 md:min-h-0 md:min-w-0 md:max-lg:gap-2 md:max-lg:px-2 lg:gap-3 lg:px-4 max-sm:[&>span]:hidden ${focusClasses}`}
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
        <main className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-11">
          <section
            className="relative block pb-5 md:flex md:min-h-[340px] md:items-center md:pb-0 xl:min-h-[338px] 2xl:min-h-[370px]"
            aria-label="Raleigh pediatric boards trip"
          >
            <div className="relative z-[1] w-full pt-8 md:w-[48%] md:pt-9 md:pb-11 xl:w-[46%]">
              <h1 className="mb-4 text-5xl leading-tight font-medium tracking-tight sm:text-6xl md:mb-6 md:text-5xl lg:text-6xl 2xl:text-7xl">
                Little patients.
                <br />
                Big milestone.
              </h1>
              <p className="max-w-[480px] text-sm leading-relaxed text-slate-800 md:max-w-[360px] xl:max-w-[450px] xl:text-base">
                Your pediatric dental boards weekend in Raleigh—with space to prepare, explore, and
                celebrate.
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-800 md:mt-5">
                October 2–6, 2026 <span aria-hidden="true">·</span> Raleigh, North Carolina
              </p>
            </div>
            <figure className="absolute top-0 right-[-22px] h-[calc(100%-30px)] w-[55%] md:w-[55%] lg:w-[57%] xl:w-[63%] max-md:relative max-md:right-3 max-md:mt-4 max-md:h-[174px] max-md:w-[calc(100%+24px)] sm:max-md:h-[210px]">
              <Image
                className="object-contain [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent),linear-gradient(to_bottom,transparent,black_6%,black_90%,transparent)] [mask-composite:intersect] md:object-cover md:object-[48%_50%]"
                src="/raleigh-watercolor.png"
                alt="Watercolor illustration of Raleigh’s skyline framed by oak trees in soft autumn colors"
                fill
                sizes="(max-width: 700px) 100vw, 60vw"
                preload
              />
              <figcaption className="absolute right-3 bottom-[-3px] text-sm font-medium leading-normal md:bottom-[-20px] xl:text-base">
                A change of scenery. A little breathing room.
              </figcaption>
            </figure>
          </section>
          <div ref={contentRef} id="trip-content" className="scroll-mt-6" tabIndex={-1}>
            {view === "itinerary" ? (
              <>
                <div
                  className="mt-1 grid grid-cols-5 border border-slate-200 md:mt-0"
                  role="tablist"
                  aria-label="Trip day"
                >
                  {days.map((item, index) => (
                    <button
                      type="button"
                      id={`tab-${item.id}`}
                      key={item.id}
                      className={`relative flex min-h-[63px] flex-col items-center justify-start gap-1 border-r border-slate-200 px-1 py-2 text-center last:border-r-0 hover:bg-emerald-50 aria-selected:bg-emerald-100 aria-selected:shadow-sm md:min-h-[70px] md:justify-center md:gap-0 md:px-2 md:py-3 ${focusClasses}`}
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
                      <span className="text-sm font-semibold tracking-wide">
                        {item.short} {item.date}
                      </span>
                      <span className="max-w-[70px] text-sm leading-snug md:max-w-none">
                        {item.label}
                      </span>
                      {item.id === "monday" ? (
                        <span
                          className="absolute top-1.5 right-1.5 size-1 rounded-full bg-amber-700 md:top-[19px] md:right-auto md:ml-[72px] md:size-[5px]"
                          aria-hidden="true"
                        />
                      ) : null}
                    </button>
                  ))}
                </div>
                <div className="mt-7 grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_285px] md:gap-6 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-7 xl:grid-cols-[minmax(0,1fr)_365px] xl:gap-10">
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
          <footer className="mt-10 flex flex-col items-start gap-3 border-t border-slate-200 pt-6 pb-6 text-sm text-slate-600 md:mt-15 md:flex-row md:items-center md:justify-between md:gap-6 md:pt-7 md:pb-8">
            <span className="flex items-center gap-2 text-lg font-medium leading-normal">
              <ToothMark className="h-7 w-6 shrink-0" />
              For the little smiles. And this big moment.
            </span>
            <span className="flex items-center gap-2">
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
