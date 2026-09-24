import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ToothMark } from "./ui";

export function SiteFooter({
  tagline,
  next,
}: Readonly<{ tagline: string; next?: Readonly<{ href: string; label: string }> }>) {
  return (
    <footer className="mt-16 flex flex-col items-start gap-3 border-t border-line py-8 md:flex-row md:items-center md:justify-between md:gap-6 print:hidden">
      <span className="flex items-center gap-3 font-display text-lg text-ink">
        <ToothMark className="h-7 w-6 text-pine-deep" />
        {tagline}
      </span>
      {next === undefined ? (
        <span className="eyebrow">Raleigh, NC · October 2026</span>
      ) : (
        <Link className="link" href={next.href}>
          {next.label} <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
    </footer>
  );
}
