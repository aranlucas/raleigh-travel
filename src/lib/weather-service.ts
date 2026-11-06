import { z } from "zod";

import {
  fallbackDays,
  FORECAST_LOCATION,
  FORECAST_WINDOW_DAYS,
  TRIP_TIME_ZONE,
  type ForecastEntry,
  type WeatherDay,
} from "./weather";

const metricSeries = z.array(z.number().nullable().catch(null)).readonly().nullish().catch(null);

const timestampSeries = z.array(z.string().nullable().catch(null)).readonly().nullish().catch(null);

const dailyFields = z.object({
  time: z.array(z.string().nullable().catch(null)).readonly(),
  temperature_2m_max: metricSeries,
  temperature_2m_min: metricSeries,
  apparent_temperature_max: metricSeries,
  apparent_temperature_min: metricSeries,
  precipitation_probability_max: metricSeries,
  precipitation_sum: metricSeries,
  precipitation_hours: metricSeries,
  weather_code: metricSeries,
  wind_speed_10m_max: metricSeries,
  wind_gusts_10m_max: metricSeries,
  wind_direction_10m_dominant: metricSeries,
  uv_index_max: metricSeries,
  sunrise: timestampSeries,
  sunset: timestampSeries,
});

const dailyPayload = dailyFields.nullish().catch(null);

const DAILY_FIELDS = Object.keys(dailyFields.shape)
  .filter((key) => key !== "time")
  .join(",");

function metric(value: number | null | undefined): number | null {
  return value !== null && value !== undefined && Number.isFinite(value) ? value : null;
}

function localTimestamp(value: string | null | undefined): string | null {
  return value !== null && value !== undefined && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/u.test(value)
    ? value
    : null;
}

type Daily = Readonly<z.infer<typeof dailyFields>>;

function buildDaily(daily: Daily | null | undefined): Map<string, ForecastEntry> {
  const byDate = new Map<string, ForecastEntry>();

  if (daily === undefined || daily === null) {
    return byDate;
  }

  for (const [i, isoDate] of daily.time.entries()) {
    if (isoDate === null) {
      continue;
    }

    const maxC = daily.temperature_2m_max?.[i];
    const minC = daily.temperature_2m_min?.[i];

    if (
      maxC === null ||
      maxC === undefined ||
      !Number.isFinite(maxC) ||
      minC === null ||
      minC === undefined ||
      !Number.isFinite(minC)
    ) {
      continue;
    }

    byDate.set(isoDate, {
      maxC,
      minC,
      feelsMaxC: metric(daily.apparent_temperature_max?.[i]),
      feelsMinC: metric(daily.apparent_temperature_min?.[i]),
      precipPct: metric(daily.precipitation_probability_max?.[i]),
      precipMm: metric(daily.precipitation_sum?.[i]),
      precipHours: metric(daily.precipitation_hours?.[i]),
      code: metric(daily.weather_code?.[i]),
      windKph: metric(daily.wind_speed_10m_max?.[i]),
      gustKph: metric(daily.wind_gusts_10m_max?.[i]),
      windDirectionDeg: metric(daily.wind_direction_10m_dominant?.[i]),
      uvMax: metric(daily.uv_index_max?.[i]),
      sunrise: localTimestamp(daily.sunrise?.[i]),
      sunset: localTimestamp(daily.sunset?.[i]),
    });
  }

  return byDate;
}

const parsedDaily = dailyPayload.transform(buildDaily);

export const parseDaily = parsedDaily.parse.bind(parsedDaily);

const forecastPayload = z.object({ daily: parsedDaily });

export async function resolveWeather(now = new Date()): Promise<WeatherDay[]> {
  const days = fallbackDays(now);

  if (!days.some((day) => day.status === "unavailable")) {
    return days;
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude: String(FORECAST_LOCATION.latitude),
    longitude: String(FORECAST_LOCATION.longitude),
    daily: DAILY_FIELDS,
    timezone: TRIP_TIME_ZONE,
    forecast_days: String(FORECAST_WINDOW_DAYS),
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
  }).toString();

  const byDate = await fetchForecast(url.href);

  return days.map((day) => {
    const forecast = day.status === "unavailable" ? byDate.get(day.isoDate) : undefined;

    return forecast ? Object.assign(day, { status: "forecast" as const, forecast }) : day;
  });
}

async function requestForecast(url: string) {
  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(2500) });

  if (!response.ok) {
    throw new Error("Forecast unavailable");
  }

  const payload = forecastPayload.parse(await response.json());
  const byDate = payload.daily;

  if (byDate.size === 0) {
    throw new Error("Empty forecast");
  }

  return byDate;
}

async function fetchForecast(url: string) {
  try {
    return await requestForecast(url);
  } catch {
    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  }

  try {
    return await requestForecast(url);
  } catch (cause) {
    throw new Error("Forecast unavailable", { cause });
  }
}
