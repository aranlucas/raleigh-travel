import {
  fallbackDays,
  FORECAST_LOCATION,
  FORECAST_WINDOW_DAYS,
  TRIP_TIME_ZONE,
  type ForecastEntry,
  type WeatherDay,
} from "./weather";

type OpenMeteoDaily = {
  time: readonly string[];
  temperature_2m_max?: readonly (number | null)[];
  temperature_2m_min?: readonly (number | null)[];
  apparent_temperature_max?: readonly (number | null)[];
  apparent_temperature_min?: readonly (number | null)[];
  precipitation_probability_max?: readonly (number | null)[];
  precipitation_sum?: readonly (number | null)[];
  precipitation_hours?: readonly (number | null)[];
  weather_code?: readonly (number | null)[];
  wind_speed_10m_max?: readonly (number | null)[];
  wind_gusts_10m_max?: readonly (number | null)[];
  wind_direction_10m_dominant?: readonly (number | null)[];
  uv_index_max?: readonly (number | null)[];
  sunrise?: readonly (string | null)[];
  sunset?: readonly (string | null)[];
};

const DAILY_FIELDS =
  "temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,precipitation_sum,precipitation_hours,weather_code,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,uv_index_max,sunrise,sunset";

function metric(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function localTimestamp(value: string | null | undefined): string | null {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/u.test(value) ? value : null;
}

export function parseDaily(daily?: Readonly<OpenMeteoDaily>): Map<string, ForecastEntry> {
  const byDate = new Map<string, ForecastEntry>();
  if (!Array.isArray(daily?.time)) {
    return byDate;
  }
  daily.time.forEach((isoDate, i) => {
    if (typeof isoDate !== "string") {
      return;
    }
    const maxC = daily.temperature_2m_max?.[i];
    const minC = daily.temperature_2m_min?.[i];
    if (
      typeof maxC !== "number" ||
      !Number.isFinite(maxC) ||
      typeof minC !== "number" ||
      !Number.isFinite(minC)
    ) {
      return;
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
  });
  return byDate;
}

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
  // Retries must be sequential; parallel calls would duplicate provider requests.
  /* oxlint-disable eslint/no-await-in-loop */
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(2500) });
      if (!response.ok) {
        throw new Error("Forecast unavailable");
      }
      const value: unknown = await response.json();
      if (value === null || typeof value !== "object") {
        throw new Error("Invalid forecast");
      }
      const payload = value as { daily?: Readonly<OpenMeteoDaily> };
      const byDate = parseDaily(payload.daily);
      if (byDate.size === 0) {
        throw new Error("Empty forecast");
      }
      return days.map((day) => {
        const forecast = day.status === "unavailable" ? byDate.get(day.isoDate) : undefined;
        return forecast ? Object.assign(day, { status: "forecast" as const, forecast }) : day;
      });
    } catch {
      if (attempt === 0) {
        await new Promise((resolve) => {
          setTimeout(resolve, 250);
        });
      }
    }
  }
  /* oxlint-enable eslint/no-await-in-loop */
  throw new Error("Forecast unavailable");
}
