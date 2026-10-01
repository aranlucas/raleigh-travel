import { unstable_cache } from "next/cache";

import {
  localToday,
  TRIP_DATES,
  TRIP_TIME_ZONE,
  FORECAST_LOCATION,
  WEATHER_REFRESH_MS,
} from "@/lib/weather";
import { resolveWeather } from "@/lib/weather-service";

export const dynamic = "force-dynamic";
const getWeather = unstable_cache(
  async (_localDate: string) => ({
    days: await resolveWeather(),
    refreshedAt: new Date().toISOString(),
  }),
  [
    "raleigh-trip-weather-v1",
    TRIP_DATES.join(","),
    TRIP_TIME_ZONE,
    JSON.stringify(FORECAST_LOCATION),
  ],
  { revalidate: WEATHER_REFRESH_MS / 1000 },
);
export async function GET() {
  try {
    return Response.json(await getWeather(localToday()), {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return Response.json(
      { error: "The latest weather could not be loaded." },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
