"use client";
import Link from "next/link";
import { useState } from "react";

import type { Day } from "@/lib/itinerary";
import {
  fallbackDays,
  formatTripDate,
  TRIP_DATES,
  TRIP_TIME_ZONE,
  type ForecastEntry,
} from "@/lib/weather";
import { getWeatherCode, isRainWeatherCode, isSnowOrStormWeatherCode } from "@/lib/weather-codes";

import { Timeline, type Filter } from "./timeline";
import { useLiveWeather } from "./use-live-weather";

type Unit = "F" | "C";
function localTime(value: string | null): string {
  const match = value?.match(/T(\d{2}):(\d{2})/u);
  if (!match) {
    return "—";
  }
  const hour = Number(match[1]);
  return `${hour % 12 || 12}:${match[2]} ${hour >= 12 ? "PM" : "AM"}`;
}
function guidance(f: Readonly<ForecastEntry>): string[] {
  const hints: string[] = [];
  if (isSnowOrStormWeatherCode(f.code)) {
    hints.push("Recheck conditions before outdoor plans.");
  }
  if (isRainWeatherCode(f.code) || (f.precipPct ?? 0) >= 35 || (f.precipMm ?? 0) >= 1) {
    hints.push("Carry a rain jacket or umbrella.");
  }
  if ((f.feelsMinC ?? f.minC) <= 15) {
    hints.push("Bring a light layer for cool mornings and evenings.");
  }
  if (f.maxC >= 27) {
    hints.push("Wear a breathable layer and carry water.");
  }
  if ((f.gustKph ?? 0) >= 40) {
    hints.push("Recheck wind before exposed outdoor walks.");
  }
  if ((f.uvMax ?? 0) >= 5) {
    hints.push("Pack sunscreen and sunglasses.");
  }
  return hints;
}
function Metric({
  label,
  value,
  detail,
}: Readonly<{ label: string; value: string; detail?: string }>) {
  return (
    <div className="min-w-0 rounded-md bg-sunk p-3">
      <dt className="eyebrow">{label}</dt>
      <dd className="type-data mt-1 text-sm">{value}</dd>
      {detail !== undefined && <dd className="mt-1 text-xs text-muted">{detail}</dd>}
    </div>
  );
}

export function TripWeather({
  day,
  filter,
  onFilterChange,
}: Readonly<{ day: Day; filter: Filter; onFilterChange: (filter: Filter) => void }>) {
  const { weather, loading, refreshing, error, refresh } = useLiveWeather();
  const [unit, setUnit] = useState<Unit>("F");
  const isoDate = TRIP_DATES.find((date) => date.slice(8) === day.date);
  const selected = (weather?.days ?? fallbackDays()).find((entry) => entry.isoDate === isoDate);
  const f = selected?.forecast ?? null;
  const code = getWeatherCode(f?.code);
  const hints = f === null ? [] : guidance(f);
  const temp = (c: number | null) =>
    c === null ? "—" : `${Math.round(unit === "C" ? c : (c * 9) / 5 + 32)}°${unit}`;
  const wind = (kph: number | null) =>
    kph === null
      ? "—"
      : unit === "C"
        ? `${Math.round(kph)} km/h`
        : `${Math.round(kph / 1.609344)} mph`;
  const precip = (mm: number | null) =>
    mm === null
      ? "Amount n/a"
      : unit === "C"
        ? `${mm.toFixed(1)} mm`
        : `${(mm / 25.4).toFixed(2)} in`;
  const weatherPanel = (
    <section className="panel mt-5 p-4 sm:p-5" aria-labelledby="day-weather-heading">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id="day-weather-heading" className="type-subhead">
          Weather & what to wear
        </h3>
        <div className="flex flex-wrap gap-1">
          <div className="flex gap-1" aria-label="Weather units">
            {(["F", "C"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={unit === value}
                onClick={() => {
                  setUnit(value);
                }}
                className={`min-h-11 min-w-11 rounded-full px-3 text-sm ${unit === value ? "bg-pine-deep text-white" : "bg-surface text-ink"}`}
              >
                °{value}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={refreshing}
            className="min-h-11 rounded-full bg-surface px-3 text-sm text-ink disabled:opacity-60"
          >
            {refreshing ? "Checking…" : "Check for update"}
          </button>
        </div>
      </div>
      <div aria-live="polite" className="mt-2 text-xs text-muted">
        {loading
          ? "Loading the latest forecast…"
          : weather
            ? `Checked ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: TRIP_TIME_ZONE, timeZoneName: "short" }).format(new Date(weather.refreshedAt))}`
            : "General clothing guidance"}
        {error !== null && <p className="mt-1 text-cardinal">{error}</p>}
      </div>
      {f === null ? (
        <div className="mt-3 text-sm text-muted">
          <p>
            {selected?.status === "past"
              ? "This trip day has passed; live forecasts do not cover past dates."
              : selected?.liveForecastOpens !== null && selected?.liveForecastOpens !== undefined
                ? `Live forecast opens ${formatTripDate(selected.liveForecastOpens)}.`
                : loading
                  ? "Checking forecast availability…"
                  : "Live forecast temporarily unavailable."}
          </p>
          <p className="mt-2">
            Comfortable walking shoes, a light layer, and rain protection are the base plan. This is
            general guidance, not a forecast.
          </p>
        </div>
      ) : (
        <>
          <p className="mt-3 text-sm font-semibold">
            {code?.emoji ?? ""} {temp(f.maxC)} / {temp(f.minC)} · {code?.label ?? "Conditions n/a"}
          </p>
          <p className="mt-1 text-xs text-muted">
            {f.precipPct === null
              ? "Precipitation chance n/a"
              : `${Math.round(f.precipPct)}% max precipitation chance`}{" "}
            · Wind {wind(f.windKph)} ·{" "}
            {selected?.leadDays === 0
              ? "Today"
              : `${selected?.leadDays ?? 0}-day ${(selected?.leadDays ?? 0) > 7 ? "early outlook" : "forecast"}`}
          </p>
          {hints.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-ink-soft">
              {hints.map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </ul>
          )}
          <details key={isoDate} className="mt-3">
            <summary className="min-h-11 cursor-pointer text-sm font-semibold text-pine">
              Detailed forecast ▾
            </summary>
            <dl className="mt-4 grid grid-cols-2 gap-2">
              <Metric
                label="Feels like"
                value={`${temp(f.feelsMaxC)} / ${temp(f.feelsMinC)}`}
                detail="Daily maximum / minimum"
              />
              <Metric
                label="Precipitation"
                value={`${f.precipPct === null ? "Chance n/a" : `${Math.round(f.precipPct)}%`} · ${precip(f.precipMm)}`}
                detail={
                  f.precipHours === null
                    ? "Duration n/a"
                    : `${f.precipHours.toFixed(1)} hours modeled`
                }
              />
              <Metric
                label="Wind max"
                value={wind(f.windKph)}
                detail={`Gusts ${wind(f.gustKph)}${f.windDirectionDeg === null ? "" : ` · ${["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(f.windDirectionDeg / 45) % 8]}`}`}
              />
              <Metric label="UV max" value={f.uvMax === null ? "—" : f.uvMax.toFixed(1)} />
              <div className="col-span-2">
                <Metric
                  label="Local daylight"
                  value={`${localTime(f.sunrise)} – ${localTime(f.sunset)}`}
                  detail="Sunrise to sunset · Eastern time"
                />
              </div>
            </dl>

            <p className="mt-3 text-xs text-muted">
              Full-day values for Raleigh. Daylight uses Eastern time. Recheck outdoor plans 24–48
              hours ahead.
            </p>
          </details>
        </>
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-xs text-muted">
        <span>
          Forecast by{" "}
          <a
            className="underline underline-offset-4"
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
          >
            Open-Meteo
          </a>{" "}
          · checks every 30 minutes.
        </span>
        <Link href="/packing" className="link">
          Carry-on packing checklist →
        </Link>
      </div>
    </section>
  );
  return (
    <Timeline
      key={day.id}
      day={day}
      filter={filter}
      onFilterChange={onFilterChange}
      weather={weatherPanel}
    />
  );
}
