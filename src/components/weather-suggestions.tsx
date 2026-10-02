import type { Day } from "@/lib/itinerary";
import type { ForecastEntry } from "@/lib/weather";
import { weatherSuggestion } from "@/lib/weather-suggestions";

import { ExternalLink } from "./ui";

export function WeatherSuggestions({
  day,
  forecast,
}: Readonly<{ day: Day; forecast: ForecastEntry | null }>) {
  const suggestion = weatherSuggestion(day, forecast);
  if (suggestion === null) {
    return null;
  }
  return (
    <div className="mt-4 rounded-md border border-line bg-surface p-4" aria-live="polite">
      <p className="eyebrow text-pine">Ideas for this weather</p>
      <h4 className="type-subhead mt-2">{suggestion.title}</h4>
      <p className="mt-1 text-xs text-muted">{suggestion.reason}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{suggestion.plan}</p>
      {suggestion.links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {suggestion.links.map((link) => (
            <ExternalLink key={link.href} {...link} />
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted">
        Based on the full-day forecast above. Check current conditions before heading out.
      </p>
    </div>
  );
}
