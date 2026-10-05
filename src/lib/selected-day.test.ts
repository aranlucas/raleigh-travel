import { expect, test } from "vitest";

import { selectedDayId } from "./selected-day";

test.each([
  ["2026-10-02", "friday"],
  ["2026-10-03", "saturday"],
  ["2026-10-04", "sunday"],
  ["2026-10-05", "monday"],
  ["2026-10-06", "tuesday"],
])("defaults to the trip day for %s", (date, expected) => {
  expect(selectedDayId("", new Date(`${date}T16:00:00Z`))).toBe(expected);
});

test("uses Raleigh's date across the UTC midnight boundary", () => {
  expect(selectedDayId("", new Date("2026-10-05T03:59:59Z"))).toBe("sunday");
  expect(selectedDayId("", new Date("2026-10-05T04:00:00Z"))).toBe("monday");
});

test("an explicit day link takes priority over today's date", () => {
  expect(selectedDayId("friday", new Date("2026-10-05T16:00:00Z"))).toBe("friday");
});

test("an unrecognized hash defaults to today", () => {
  expect(selectedDayId("trip-content", new Date("2026-10-05T16:00:00Z"))).toBe("monday");
});

test.each(["2026-10-01", "2026-10-07", "2027-10-05", "2026-11-05"])(
  "keeps the Saturday fallback outside the trip on %s",
  (date) => {
    expect(selectedDayId("", new Date(`${date}T16:00:00Z`))).toBe("saturday");
  },
);
