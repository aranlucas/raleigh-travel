export const TRIP_TIME_ZONE = "America/New_York";
export const WEATHER_REFRESH_MS = 30 * 60 * 1000;
export const FORECAST_WINDOW_DAYS = 16;
export const FORECAST_LOCATION = { name: "Raleigh", latitude: 35.7796, longitude: -78.6382 };
export const TRIP_DATES = [
  "2026-10-02",
  "2026-10-03",
  "2026-10-04",
  "2026-10-05",
  "2026-10-06",
] as const;

export type ForecastEntry = Readonly<{
  maxC: number;
  minC: number;
  feelsMaxC: number | null;
  feelsMinC: number | null;
  precipPct: number | null;
  precipMm: number | null;
  precipHours: number | null;
  code: number | null;
  windKph: number | null;
  gustKph: number | null;
  windDirectionDeg: number | null;
  uvMax: number | null;
  sunrise: string | null;
  sunset: string | null;
}>;
export type WeatherDay = Readonly<{
  isoDate: string;
  leadDays: number;
  forecast: ForecastEntry | null;
  status: "forecast" | "upcoming" | "past" | "unavailable";
  liveForecastOpens: string | null;
}>;
export type WeatherResponse = Readonly<{ days: readonly WeatherDay[]; refreshedAt: string }>;

export function localToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TRIP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}
export function daysUntil(isoDate: string, now = new Date()): number {
  return Math.round(
    (Date.parse(`${isoDate}T00:00:00Z`) - Date.parse(`${localToday(now)}T00:00:00Z`)) / 86400000,
  );
}
export function fallbackDays(now = new Date()): WeatherDay[] {
  return TRIP_DATES.map((isoDate) => {
    const leadDays = daysUntil(isoDate, now);
    const unlock = new Date(`${isoDate}T00:00:00Z`);
    unlock.setUTCDate(unlock.getUTCDate() - (FORECAST_WINDOW_DAYS - 1));
    return {
      isoDate,
      leadDays,
      forecast: null,
      status: leadDays < 0 ? "past" : leadDays >= FORECAST_WINDOW_DAYS ? "upcoming" : "unavailable",
      liveForecastOpens:
        leadDays >= FORECAST_WINDOW_DAYS ? unlock.toISOString().slice(0, 10) : null,
    };
  });
}
export function formatTripDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
