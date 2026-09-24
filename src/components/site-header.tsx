"use client";

import { Printer } from "lucide-react";
import Link from "next/link";

import { Wordmark } from "./ui";

export type Section = "itinerary" | "details" | "study" | "themes" | "recap";

const groups: readonly (readonly { id: Section; href: string; label: string }[])[] = [
  [
    { id: "itinerary", href: "/", label: "Itinerary" },
    { id: "details", href: "/details", label: "Trip details" },
  ],
  [
    { id: "study", href: "/study", label: "Study guide" },
    { id: "themes", href: "/study/themes", label: "Theme notes" },
    { id: "recap", href: "/study/recap", label: "Recap sheet" },
  ],
];

export function SiteHeader({ current }: Readonly<{ current: Section }>) {
  return (
    <header className="border-b border-line print:hidden">
      <div className="page-shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <Wordmark />
        <nav
          className="order-last -mx-5 flex w-[calc(100%+2.5rem)] items-center gap-1 overflow-x-auto px-4 [scrollbar-width:none] lg:order-none lg:mx-0 lg:w-auto lg:overflow-visible lg:px-0"
          aria-label="Main navigation"
        >
          {groups.map((group, index) => (
            <div className="flex shrink-0 items-center gap-1" key={group[0].id}>
              {index > 0 ? <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" /> : null}
              {group.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={item.id === current ? "page" : undefined}
                  className="inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-ink-soft no-underline transition-colors hover:bg-sunk hover:text-ink aria-[current=page]:bg-ink aria-[current=page]:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <button
          type="button"
          className="btn btn-secondary max-sm:w-10 max-sm:px-0"
          aria-label="Print this page"
          onClick={() => {
            window.print();
          }}
        >
          <Printer size={17} strokeWidth={1.75} aria-hidden="true" />
          <span className="max-sm:hidden">Print</span>
        </button>
      </div>
    </header>
  );
}
