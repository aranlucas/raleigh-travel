"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { PACKING_GROUPS, packingWeatherNotes } from "@/lib/packing";
import { packingStore } from "@/lib/packing-store";

import { useLiveWeather } from "./use-live-weather";

export function TripPacking() {
  const { weather, loading, error: forecastError } = useLiveWeather();
  const packed = useSyncExternalStore(
    packingStore.subscribe,
    packingStore.getSnapshot,
    packingStore.getServerSnapshot,
  );
  const total = PACKING_GROUPS.reduce((count, group) => count + group.items.length, 0);
  const notes = packingWeatherNotes(weather);
  return (
    <section id="packing" aria-labelledby="packing-heading" className="scroll-mt-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Lucas · five days · carry-on only</p>
          <h1 className="type-title mt-2" id="packing-heading">
            Pack light for Raleigh
          </h1>
        </div>
        <p
          className="type-data rounded-full bg-pine-wash px-4 py-2 text-sm text-pine-deep"
          aria-live="polite"
        >
          {packed.size} of {total} packed
        </p>
      </div>
      <p className="mt-3 max-w-3xl text-sm text-muted">
        These totals include what you wear. Put the bulkier layer, pants, and sneakers on for the
        flight. A light layer and rain shell are the starting plan; no heavy coat needed.
      </p>
      <div className="mt-5 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PACKING_GROUPS.map((group) => (
          <fieldset key={group.title} className="card min-w-0 p-5 sm:p-6">
            <legend className="sr-only">{group.title}</legend>
            <h3 className="type-subhead" aria-hidden="true">
              {group.title}
            </h3>
            <div className="mt-3 divide-y divide-line">
              {group.items.map((item) => (
                <label
                  key={item.id}
                  aria-label={item.label}
                  className="flex min-h-11 cursor-pointer items-start gap-3 py-3"
                >
                  <input
                    type="checkbox"
                    checked={packed.has(item.id)}
                    onChange={() => {
                      packingStore.toggle(item.id);
                    }}
                    className="mt-1 size-5 shrink-0 accent-pine"
                  />
                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-semibold ${packed.has(item.id) ? "text-muted line-through" : "text-ink"}`}
                    >
                      {item.label}
                      {item.optional === true && (
                        <span className="ml-2 font-normal text-muted">· optional</span>
                      )}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {item.detail}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="panel mt-4 p-5 sm:p-6">
        <h3 className="type-subhead">What the forecast suggests</h3>
        {notes.length > 0 ? (
          <>
            <p className="mt-2 text-xs text-muted">
              {forecastError === null
                ? "Based on the latest loaded trip forecast; recheck before departure."
                : "Based on the last loaded forecast; the latest update is unavailable."}
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-ink-soft">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted">
            {weather === null
              ? loading
                ? "Live weather is loading."
                : "Live weather is unavailable."
              : "No extra heat, rain, or cool-weather packing notes from the available forecast."}{" "}
            Keep the base layers and rain protection; check each day’s forecast before departure.
          </p>
        )}
      </div>
      <Link href="/" className="link mt-4">
        View each day’s forecast →
      </Link>
      <p className="mt-3 text-xs text-muted">
        Checks stay in this browser when local storage is available.
      </p>
    </section>
  );
}
