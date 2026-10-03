"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { WEATHER_REFRESH_MS, type WeatherResponse } from "@/lib/weather";
import { weatherResponse } from "@/lib/weather-response";

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

      const parsed = weatherResponse.safeParse(await response.json());

      if (!response.ok || !parsed.success) {
        throw new Error("Invalid weather response");
      }

      setWeather(parsed.data);
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
