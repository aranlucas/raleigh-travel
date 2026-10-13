"use client";

import { Printer } from "lucide-react";
import Link from "next/link";

import { Wordmark } from "./ui";

export type Section = "itinerary" | "raleigh" | "details" | "packing";

type NavItem = Readonly<{ id: Section; href: string; label: string }>;

type NavGroup = Readonly<{ label: string; items: readonly NavItem[] }>;

const groups: readonly NavGroup[] = [
  {
    label: "Trip",
    items: [
      { id: "itinerary", href: "/", label: "Day by day" },
      { id: "raleigh", href: "/raleigh", label: "Explore Raleigh" },
      { id: "details", href: "/details", label: "Logistics" },
      { id: "packing", href: "/packing", label: "Packing" },
    ],
  },
];

type SiteHeaderProps = Readonly<{ current: Section }>;

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <header className="border-be border-line print:hidden">
      <div className="page-shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <Wordmark />
        <nav
          className="order-last -mx-5 flex bleed-inline scrollbar-none items-center gap-1 overflow-x-auto px-4 lg:order-0 lg:mx-0 lg:w-auto lg:overflow-visible lg:px-0"
          aria-label="Main navigation"
        >
          {groups.map((group, index) => (
            <div className="flex shrink-0 items-center gap-1" key={group.label}>
              {index > 0 ? <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" /> : null}
              <span className="me-1 eyebrow text-2xs text-muted" aria-hidden="true">
                {group.label}
              </span>
              {group.items.map((item) => (
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
          <a className="ms-4 link shrink-0" href="https://oral-boards.vercel.app/study">
            Oral Boards ↗
          </a>
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
