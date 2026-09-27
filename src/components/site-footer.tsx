import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function SiteFooter({
  next,
}: Readonly<{ next?: Readonly<{ href: string; label: string }> }>) {
  return (
    <footer className="mt-16 flex flex-col items-start gap-3 border-t border-line py-8 md:flex-row md:items-center md:justify-between md:gap-6 print:hidden">
      <p className="text-sm text-muted">
        Trip sources checked September 23, 2026. Confirm travel details and opening hours before
        heading out.
      </p>
      {next === undefined ? null : (
        <Link className="link" href={next.href}>
          {next.label} <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
    </footer>
  );
}
