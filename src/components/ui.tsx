import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

import type { PlanLink } from "@/lib/itinerary";

export function Wordmark({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <Link
      className={`inline-flex shrink-0 items-center gap-3 text-ink no-underline ${className}`}
      href="/"
      aria-label="Raleigh trip, home"
    >
      <MapPin className="h-8 w-7 text-pine-deep" strokeWidth={1.5} aria-hidden="true" />
      <span className="font-display text-2xl leading-none tracking-tight">Raleigh, together</span>
    </Link>
  );
}

export function ExternalLink({ href, label }: PlanLink) {
  if (href.startsWith("/")) {
    return (
      <Link className="link" href={href}>
        {label}
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a className="link" href={href} target="_blank" rel="noopener noreferrer">
      {label}
      <ArrowUpRight size={15} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
