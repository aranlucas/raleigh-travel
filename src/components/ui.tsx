import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { PlanLink } from "@/lib/itinerary";

export function ToothMark({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      width="36"
      height="40"
      viewBox="0 0 36 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 8c-3-3-9-3-11 2-3 6 1 10 2 14 1 4 1 10 4 10 3 0 2-10 5-10s2 10 5 10c3 0 3-6 4-10 1-4 5-8 2-14-2-5-8-5-11-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14 15c2 2 6 2 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M31 2v5M28.5 4.5h5" stroke="#b66e38" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ExternalLink({ href, label }: PlanLink) {
  if (href.startsWith("/")) {
    return (
      <Link className="text-link" href={href}>
        {label}
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
      {label}
      <ArrowUpRight size={15} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
