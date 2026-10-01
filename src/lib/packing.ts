import { formatTripDate, type WeatherResponse } from "./weather";
import { isRainWeatherCode } from "./weather-codes";

export const PACKING_STORAGE_KEY = "raleigh-packing-lucas-2026-10-02-v1";
export const PACKING_CHANGE_EVENT = "raleigh-packing-change";
export type PackingItem = Readonly<{
  id: string;
  label: string;
  detail: string;
  optional?: boolean;
}>;
export const PACKING_GROUPS: readonly Readonly<{ title: string; items: readonly PackingItem[] }>[] =
  [
    {
      title: "Clothes · totals include what you wear",
      items: [
        {
          id: "tops",
          label: "5 lightweight tops",
          detail:
            "Include one polo or button-down. Make one top workout-friendly if you plan to run.",
        },
        {
          id: "pants",
          label: "2 lightweight pants",
          detail: "Wear one pair on the plane; pack one.",
        },
        {
          id: "shorts",
          label: "1 pair of shorts",
          detail: "Choose workout-friendly shorts if you plan to run.",
        },
        {
          id: "layer",
          label: "1 light hoodie or fleece",
          detail:
            "Wear your bulkier layer on the plane; useful for cool mornings and air conditioning.",
        },
        {
          id: "jacket",
          label: "1 packable waterproof hooded jacket",
          detail: "Keep it accessible for rainy walks.",
        },
        {
          id: "underwear",
          label: "5 pairs of underwear",
          detail: "One for each trip day, including the pair worn on departure.",
        },
        {
          id: "socks",
          label: "6 pairs of socks",
          detail: "Five days plus a spare for rain or a run.",
        },
        { id: "sleepwear", label: "Sleepwear", detail: "One light set for four hotel nights." },
      ],
    },
    {
      title: "Walking & weather",
      items: [
        {
          id: "shoes",
          label: "Comfortable, grippy sneakers",
          detail: "Wear them on the plane. One versatile pair keeps the bag light.",
        },
        {
          id: "umbrella",
          label: "Compact umbrella",
          detail: "Optional extra rain coverage alongside your jacket.",
          optional: true,
        },
        {
          id: "sun",
          label: "Sunglasses & sunscreen",
          detail: "Keep sun protection handy for outdoor breaks.",
        },
        {
          id: "wet-bag",
          label: "Small wet-clothes bag",
          detail: "Separate damp socks, rain gear, or workout clothes.",
        },
      ],
    },
    {
      title: "Toiletries & essentials",
      items: [
        {
          id: "toiletries",
          label: "Travel toiletries",
          detail:
            "Pack your toothbrush, toothpaste, deodorant, and usual personal care items in carry-on sizes.",
        },
        {
          id: "medications",
          label: "Any usual medications",
          detail: "Keep what you use in your personal item; skip this if none are needed.",
          optional: true,
        },
        {
          id: "chargers",
          label: "Phone & device chargers",
          detail: "Bring the cables and adapter you actually use.",
        },
        {
          id: "wallet",
          label: "Photo ID & wallet",
          detail: "Keep them with you for flights and hotel check-in.",
        },
      ],
    },
  ];
const itemIds = new Set(PACKING_GROUPS.flatMap((group) => group.items.map((item) => item.id)));
export function readPackedItems(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) {
      return [];
    }
    return [
      ...new Set(value.filter((id): id is string => typeof id === "string" && itemIds.has(id))),
    ];
  } catch {
    return [];
  }
}

/** Guidance follows the currently loaded trip forecast; no permanent trip temperatures. */
export function packingWeatherNotes(weather: Readonly<WeatherResponse> | null): string[] {
  if (weather === null) {
    return [];
  }
  const notes: string[] = [];
  for (const day of weather.days) {
    const f = day.forecast;
    if (f === null) {
      continue;
    }
    const date = formatTripDate(day.isoDate);
    if (f.maxC >= 27) {
      notes.push(`${date}: breathable tops and shorts will be useful in the heat.`);
    }
    if (isRainWeatherCode(f.code) || (f.precipPct ?? 0) >= 35 || (f.precipMm ?? 0) >= 1) {
      notes.push(`${date}: keep your hooded jacket and spare socks ready for rain.`);
    }
    if ((f.feelsMinC ?? f.minC) <= 15) {
      notes.push(`${date}: keep the light layer handy for cooler mornings and evenings.`);
    }
  }
  return notes;
}
