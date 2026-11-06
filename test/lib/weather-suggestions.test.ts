import { expect, test } from "vitest";

import { days } from "@/lib/itinerary";
import { parseDaily } from "@/lib/weather-service";
import { weatherSuggestion } from "@/lib/weather-suggestions";

test("outdoor alternatives retain their links when activity IDs and display labels change", () => {
  const saturday = days.find((day) => day.id === "saturday");

  const forecast = parseDaily({
    time: ["2026-10-03"],
    temperature_2m_max: [23],
    temperature_2m_min: [12],
  }).get("2026-10-03");

  if (saturday === undefined || forecast === undefined) {
    throw new Error("Missing Saturday fixture");
  }

  const editedDay = {
    ...saturday,
    activities: saturday.activities.map((activity) => ({
      ...activity,
      id: `renamed-${activity.id}`,
      links: activity.links?.map((link) => ({ ...link, label: "Updated visitor link" })),
    })),
  };

  expect(weatherSuggestion(editedDay, forecast)?.links).toEqual([
    {
      label: "Hours & admission",
      href: "https://www.naturalsciences.org/visit/hours-admission",
    },
    {
      label: "Museum of Natural Sciences directions",
      href: "https://www.google.com/maps/search/?api=1&query=North%20Carolina%20Museum%20of%20Natural%20Sciences%2C%2011%20West%20Jones%20Street%2C%20Raleigh%20NC",
    },
    {
      label: "Optional: State Capitol and a coffee directions",
      href: "https://www.google.com/maps/search/?api=1&query=North%20Carolina%20State%20Capitol%2C%201%20East%20Edenton%20Street%2C%20Raleigh%20NC",
    },
  ]);
});
