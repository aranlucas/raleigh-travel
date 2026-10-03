import { expect, test } from "vitest";

import { fallbackDays } from "./weather";
import { weatherResponse } from "./weather-response";
import { parseDaily } from "./weather-service";

test("provider parsing keeps valid days and rejects malformed temperatures", () => {
  const days = parseDaily({
    time: ["2026-10-02", "2026-10-03", null],
    temperature_2m_max: [23, "24", 25],
    temperature_2m_min: [12, 13, 14],
    precipitation_sum: ["bad", 2, 3],
  });

  expect(days.size).toBe(1);
  expect(days.get("2026-10-02")?.maxC).toBe(23);
  expect(days.get("2026-10-02")?.precipMm).toBeNull();
});

test("provider parsing fails closed on missing or invalid daily arrays", () => {
  expect(parseDaily(null).size).toBe(0);
  expect(parseDaily({ time: "2026-10-02" }).size).toBe(0);
});

test("client payload validation checks dates, timestamp and forecast fields", () => {
  const days = fallbackDays(new Date("2026-10-02T12:00:00Z"));
  const valid = { days, refreshedAt: "2026-10-02T12:00:00Z" };

  expect(weatherResponse.safeParse(valid).success).toBe(true);
  expect(weatherResponse.safeParse({ ...valid, refreshedAt: "not-a-date" }).success).toBe(false);
  expect(weatherResponse.safeParse({ ...valid, days: days.toReversed() }).success).toBe(false);
  expect(
    weatherResponse.safeParse({
      ...valid,
      days: days.map((day) =>
        Object.assign({}, day, { status: "forecast", forecast: { maxC: 23, minC: 12 } }),
      ),
    }).success,
  ).toBe(false);
});
