import { z } from "zod";

import { TRIP_DATES } from "./weather";

const metric = z.number().nullable();

const forecast = z.object({
  maxC: z.number(),
  minC: z.number(),
  feelsMaxC: metric,
  feelsMinC: metric,
  precipPct: metric,
  precipMm: metric,
  precipHours: metric,
  code: metric,
  windKph: metric,
  gustKph: metric,
  windDirectionDeg: metric,
  uvMax: metric,
  sunrise: z.string().nullable(),
  sunset: z.string().nullable(),
});

const day = z
  .object({
    isoDate: z.string(),
    leadDays: z.number(),
    forecast: forecast.nullable(),
    status: z.enum(["forecast", "upcoming", "past", "unavailable"]),
    liveForecastOpens: z.string().nullable(),
  })
  .refine((value) => value.status !== "forecast" || value.forecast !== null);

export const weatherResponse = z.object({
  refreshedAt: z.string().refine((value) => Number.isFinite(Date.parse(value))),
  days: z
    .array(day)
    .length(TRIP_DATES.length)
    .refine((days) => days.every((value, index) => value.isoDate === TRIP_DATES[index])),
});
