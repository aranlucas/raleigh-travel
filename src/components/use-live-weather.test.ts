import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { fallbackDays, WEATHER_REFRESH_MS } from "@/lib/weather";

import { useLiveWeather } from "./use-live-weather";

const now = new Date("2026-10-02T12:00:00Z");

const validWeather = { days: fallbackDays(now), refreshedAt: now.toISOString() };

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

test("initial and periodic refreshes load validated weather, then stop on unmount", async () => {
  const fetcher = vi
    .fn<typeof fetch>()
    .mockImplementation(() => Promise.resolve(Response.json(validWeather)));

  vi.stubGlobal("fetch", fetcher);
  const { result, unmount } = renderHook(useLiveWeather);

  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });

  expect(result.current.weather).toEqual(validWeather);
  expect(result.current.loading).toBe(false);
  expect(result.current.refreshing).toBe(false);
  expect(result.current.error).toBeNull();
  expect(fetcher).toHaveBeenCalledTimes(1);

  await act(async () => {
    await vi.advanceTimersByTimeAsync(WEATHER_REFRESH_MS);
  });
  expect(fetcher).toHaveBeenCalledTimes(2);

  unmount();
  await vi.advanceTimersByTimeAsync(WEATHER_REFRESH_MS);
  window.dispatchEvent(new Event("online"));
  document.dispatchEvent(new Event("visibilitychange"));
  expect(fetcher).toHaveBeenCalledTimes(2);
});

test("an online event retries failed weather and clears the visible error", async () => {
  const fetcher = vi
    .fn<typeof fetch>()
    .mockRejectedValueOnce(new Error("Offline"))
    .mockResolvedValueOnce(Response.json(validWeather));

  vi.stubGlobal("fetch", fetcher);
  const { result } = renderHook(useLiveWeather);

  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(result.current.error).toContain("temporarily unavailable");
  expect(result.current.loading).toBe(false);
  expect(result.current.refreshing).toBe(false);

  await act(async () => {
    window.dispatchEvent(new Event("online"));
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(result.current.weather).toEqual(validWeather);
  expect(result.current.error).toBeNull();
  expect(fetcher).toHaveBeenCalledTimes(2);
});

test("visibility changes refresh only stale weather in a visible document", async () => {
  const fetcher = vi
    .fn<typeof fetch>()
    .mockImplementation(() => Promise.resolve(Response.json(validWeather)));

  vi.stubGlobal("fetch", fetcher);
  const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  renderHook(useLiveWeather);

  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
    document.dispatchEvent(new Event("visibilitychange"));
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(fetcher).toHaveBeenCalledTimes(1);

  vi.setSystemTime(now.getTime() + WEATHER_REFRESH_MS);
  visibility.mockReturnValue("hidden");
  await act(async () => {
    document.dispatchEvent(new Event("visibilitychange"));
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(fetcher).toHaveBeenCalledTimes(1);

  visibility.mockReturnValue("visible");
  await act(async () => {
    document.dispatchEvent(new Event("visibilitychange"));
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(fetcher).toHaveBeenCalledTimes(2);
});

test("concurrent triggers share the in-flight request", async () => {
  const request = Promise.withResolvers<Response>();
  const fetcher = vi.fn<typeof fetch>().mockReturnValue(request.promise);
  vi.stubGlobal("fetch", fetcher);
  const { result } = renderHook(useLiveWeather);

  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
    window.dispatchEvent(new Event("online"));
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(result.current.refreshing).toBe(true);

  await act(async () => {
    request.resolve(Response.json(validWeather));
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(result.current.weather).toEqual(validWeather);
  expect(result.current.refreshing).toBe(false);
});
