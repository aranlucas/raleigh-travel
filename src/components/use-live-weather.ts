"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  TRIP_DATES,
  WEATHER_REFRESH_MS,
  type WeatherDay,
  type WeatherResponse,
} from "@/lib/weather";
function isWeatherResponse(value: unknown): value is WeatherResponse {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const candidate = value as Partial<WeatherResponse>;
  return (
    typeof candidate.refreshedAt === "string" &&
    Number.isFinite(Date.parse(candidate.refreshedAt)) &&
    Array.isArray(candidate.days) &&
    candidate.days.length === TRIP_DATES.length &&
    candidate.days.every(
      (day: WeatherDay, index) =>
        day.isoDate === TRIP_DATES[index] &&
        ["forecast", "upcoming", "past", "unavailable"].includes(day.status) &&
        (day.status !== "forecast" ||
          (day.forecast !== null &&
            Number.isFinite(day.forecast.maxC) &&
            Number.isFinite(day.forecast.minC))),
    )
  );
}

export function useLiveWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);
  const lastSuccess = useRef(0);
  const refresh = useCallback(async () => {
    if (inFlight.current) {
      return;
    }
    inFlight.current = true;
    setRefreshing(true);
    try {
      const response = await fetch("/api/weather", {
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      });
      const payload: unknown = await response.json();
      if (!response.ok || !isWeatherResponse(payload)) {
        throw new Error("Invalid weather response");
      }
      setWeather(payload);
      setError(null);
      lastSuccess.current = Date.now();
    } catch {
      setError(
        "Latest weather is temporarily unavailable. Showing the last forecast or general packing guidance.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
      inFlight.current = false;
    }
  }, []);
  useEffect(() => {
    const initial = window.setTimeout(() => void refresh(), 0);
    const interval = window.setInterval(() => void refresh(), WEATHER_REFRESH_MS);
    const onVisible = () => {
      if (
        document.visibilityState === "visible" &&
        Date.now() - lastSuccess.current >= WEATHER_REFRESH_MS
      ) {
        void refresh();
      }
    };
    const onOnline = () => void refresh();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onOnline);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onOnline);
    };
  }, [refresh]);
  return { weather, loading, refreshing, error, refresh };
}
