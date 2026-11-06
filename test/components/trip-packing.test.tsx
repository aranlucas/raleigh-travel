import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { fallbackDays, WEATHER_REFRESH_MS } from "@/lib/weather";

import { PACKING_STORAGE_KEY } from "@/lib/packing-store";

import { TripPacking } from "@/components/trip-packing";

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("No network in packing test")));
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

function checkbox(label: string): HTMLInputElement {
  return screen.getByRole<HTMLInputElement>("checkbox", { name: label });
}

test("a failed save does not undo checkbox changes or the packed count", () => {
  window.localStorage.setItem(PACKING_STORAGE_KEY, '["tops"]');
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new DOMException("Storage full", "QuotaExceededError");
  });
  const { container } = render(<TripPacking />);

  expect(checkbox("5 lightweight tops").checked).toBe(true);
  fireEvent.click(checkbox("2 lightweight pants"));
  expect(checkbox("2 lightweight pants").checked).toBe(true);
  expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("2 of 18 packed");

  fireEvent.click(checkbox("5 lightweight tops"));
  expect(checkbox("5 lightweight tops").checked).toBe(false);
  expect(checkbox("2 lightweight pants").checked).toBe(true);
  expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("1 of 18 packed");

  act(() => {
    window.localStorage.removeItem(PACKING_STORAGE_KEY);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: PACKING_STORAGE_KEY,
        newValue: null,
        storageArea: window.localStorage,
      }),
    );
  });
  expect(checkbox("2 lightweight pants").checked).toBe(false);
  expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("0 of 18 packed");
});

const checkedAt = new Date("2026-10-02T12:00:00Z");

const mildForecast = {
  maxC: 23,
  minC: 18,
  feelsMaxC: null,
  feelsMinC: null,
  precipPct: 0,
  precipMm: 0,
  precipHours: null,
  code: 0,
  windKph: null,
  gustKph: null,
  windDirectionDeg: null,
  uvMax: null,
  sunrise: null,
  sunset: null,
};

test("a successful response without forecasts states that guidance is general", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(
      Response.json({
        days: fallbackDays(new Date("2026-11-06T12:00:00Z")),
        refreshedAt: checkedAt.toISOString(),
      }),
    ),
  );
  render(<TripPacking />);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(screen.getByText(/No trip forecast is available/)).toBeDefined();
  expect(screen.queryByText(/No extra heat, rain/)).toBeNull();
});

test("mild forecast notes disclose a subsequent failed refresh", async () => {
  const days = fallbackDays(checkedAt).map((day, index) =>
    index === 0 ? { ...day, status: "forecast", forecast: mildForecast } : day,
  );

  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockResolvedValueOnce(Response.json({ days, refreshedAt: checkedAt.toISOString() }))
      .mockRejectedValue(new Error("Offline")),
  );
  render(<TripPacking />);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(screen.getByText(/No extra heat, rain/)).toBeDefined();
  expect(screen.getByText(/Based on the latest loaded trip forecast/)).toBeDefined();
  await act(async () => {
    await vi.advanceTimersByTimeAsync(WEATHER_REFRESH_MS);
  });
  expect(
    screen.getByText(/Based on the last loaded forecast; the latest update is unavailable/),
  ).toBeDefined();
  expect(screen.getByText(/No extra heat, rain/)).toBeDefined();
});
