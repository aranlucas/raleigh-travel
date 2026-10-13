import type { Day } from "@/lib/itinerary";
import type { ForecastEntry } from "@/lib/weather";
import { weatherSuggestion } from "@/lib/weather-suggestions";

import { ExternalLink } from "./ui";

type WeatherSuggestionsProps = Readonly<{ day: Day; forecast: ForecastEntry | null }>;

export function WeatherSuggestions({ day, forecast }: WeatherSuggestionsProps) {
  const suggestion = weatherSuggestion(day, forecast);

  if (suggestion === null) {
    return null;
  }

  return (
    <div className="mbs-4 rounded-md border border-line bg-surface p-4" aria-live="polite">
      <p className="eyebrow text-label text-pine">Ideas for this weather</p>
      <h4 className="mbs-2 type-subhead">{suggestion.title}</h4>
      <p className="mbs-1 text-xs text-muted">{suggestion.reason}</p>
      <p className="mbs-3 text-sm leading-relaxed text-ink-soft">{suggestion.plan}</p>
      {suggestion.links.length > 0 && (
        <div className="mbs-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {suggestion.links.map((link) => (
            <ExternalLink key={link.href} {...link} />
          ))}
        </div>
      )}
      <p className="mbs-3 text-xs text-muted">
        Based on the full-day forecast above. Check current conditions before heading out.
      </p>
    </div>
  );
}
