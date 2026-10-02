import type { Day, PlanLink } from "./itinerary";
import type { ForecastEntry } from "./weather";
import { getWeatherCode, isRainWeatherCode, isSnowOrStormWeatherCode } from "./weather-codes";

export type WeatherSuggestion = Readonly<{
  title: string;
  reason: string;
  plan: string;
  links: readonly PlanLink[];
}>;

/** Full-day forecasts guide flexible outings; they cannot promise a dry hour. */
export function weatherSuggestion(day: Day, f: ForecastEntry | null): WeatherSuggestion | null {
  if (f === null) {
    return null;
  }
  const stormOrSnow = isSnowOrStormWeatherCode(f.code) || [56, 57, 66, 67].includes(f.code ?? -1);
  const windy = Math.max(f.windKph ?? 0, f.gustKph ?? 0) >= 40;
  const wet = isRainWeatherCode(f.code) || (f.precipPct ?? 0) >= 35 || (f.precipMm ?? 0) >= 1;
  const hot = Math.max(f.maxC, f.feelsMaxC ?? f.maxC) >= 27;
  const cold = (f.feelsMaxC ?? f.maxC) <= 15;
  const dry =
    getWeatherCode(f.code) !== undefined &&
    f.code !== 45 &&
    f.code !== 48 &&
    f.precipPct !== null &&
    f.precipMm !== null;
  const indoor = stormOrSnow || windy || wet || hot || cold || !dry;
  const title = stormOrSnow
    ? "Make it an indoor day"
    : windy
      ? "Skip exposed walks"
      : wet
        ? "Keep a rain-friendly plan"
        : hot
          ? "Choose a cool afternoon"
          : cold
            ? "Keep outdoor breaks short"
            : dry
              ? "A good outlook for a walk"
              : "Keep the outdoor option flexible";
  const reason = stormOrSnow
    ? "Storms, snow, or icy precipitation are in the daily forecast."
    : windy
      ? "Forecast winds or gusts reach at least 25 mph."
      : wet
        ? "The forecast shows rain, at least a 35% precipitation chance, or 1 mm of precipitation."
        : hot
          ? "The high or feels-like high reaches at least 81°F."
          : cold
            ? "The daytime feels-like high is 59°F or below."
            : dry
              ? "Rain indicators are low and temperatures look comfortable for a short outing."
              : "Rain or visibility details do not establish a comfortable outdoor window.";
  const activityIds =
    day.id === "saturday" ? ["science", "capitol"] : day.id === "sunday" ? ["art"] : [];
  const links = day.activities
    .filter((activity) => activityIds.includes(activity.id))
    .flatMap((activity) =>
      (activity.links ?? [])
        .filter(
          (link) =>
            link.label === "Directions" ||
            link.label === "Hours & admission" ||
            link.label === "Museum visitor details",
        )
        .map((link) =>
          link.label === "Directions"
            ? { href: link.href, label: `${activity.title} directions` }
            : link,
        ),
    );
  const plans: Record<string, string> = {
    friday: indoor
      ? "After check-in, eat indoors near the hotel or get takeaway, then rest. Pick up a few snacks at the hotel’s 24-hour H Market if you would rather skip the grocery walk."
      : "If you still have energy after dinner, combine a short North Hills stroll with the Harris Teeter snack stop, then wind down at the hotel. Use the hotel market instead if you are tired.",
    saturday: indoor
      ? "Keep lunch and the 1:45 PM science museum visit. Linger in the galleries or café instead of walking the festival streets; skip the Capitol stop if conditions are poor."
      : "After the science museum, walk the short route to the Capitol and stop for coffee. A few festival songs can fit if you feel rested. Check conditions before going outside.",
    sunday: indoor
      ? "Keep the 1 PM art museum visit and focus on indoor galleries. Skip the sculpture-park loop. Fit the exam entrance check into a safe weather break, or use a short ride if needed."
      : "Combine the art galleries with a short Museum Park loop, then return for the 4 PM exam-route check. Keep the afternoon light and finish studying by 5 PM.",
    monday: indoor
      ? "Rest indoors near the hotel before the exam. Check conditions before the 2:25 PM departure; allow extra time and use a short ride if the walk is unsuitable. Registration stays at 2:45 PM."
      : "A brief North Hills walk after lunch can help you reset. Stay near the hotel and be ready to leave at 2:25 PM for 2:45 PM registration.",
    tuesday: indoor
      ? "Have breakfast indoors and pack early. Recheck road conditions and leave extra transfer time if needed; aim to reach RDU by 11:45 AM. Check flight status for both return legs."
      : "Enjoy breakfast nearby or a brief walk before packing. Leave for RDU around 11 AM and aim to arrive by 11:45 AM.",
  };
  return {
    title,
    reason,
    plan:
      plans[day.id] ??
      "Keep an indoor alternative handy and check conditions before outdoor plans.",
    links,
  };
}
