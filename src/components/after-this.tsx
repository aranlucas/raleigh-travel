import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

import { activityContext } from "@/lib/itinerary";

/** Links a study block to whatever the itinerary schedules right after it. */
export function AfterThis({ blockId }: Readonly<{ blockId: string }>) {
  const context = activityContext(blockId);
  if (context?.after === undefined) {
    return null;
  }
  const { day, after } = context;
  return (
    <Link
      className="mt-4 flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3 text-sm text-ink no-underline hover:border-pine"
      href={`/#${day.id}`}
    >
      <CalendarDays className="text-sky" size={16} aria-hidden="true" />
      <span>
        <span className="text-muted">Then: </span>
        <span className="font-medium">{after.title}</span>
        <span className="text-muted"> · {after.description}</span>
      </span>
      <ArrowRight className="ml-auto text-muted" size={15} aria-hidden="true" />
    </Link>
  );
}
