import Link from "next/link";

import { ToothMark } from "./ui";

export function StudyHeader({ recap = false }: Readonly<{ recap?: boolean }>) {
  const navLinkClassName =
    "inline-flex items-center border-b-3 border-transparent py-3 text-sm transition-colors hover:border-emerald-600 aria-[current=page]:border-emerald-600 aria-[current=page]:font-semibold motion-reduce:transition-none md:py-0";
  return (
    <header className="mx-4 border-b border-slate-200 sm:mx-6 print:hidden">
      <div className="mx-auto flex max-w-[1392px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-1 pt-5 sm:px-5 md:min-h-18 md:flex-nowrap md:py-0">
        <Link
          className="inline-flex shrink-0 items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          href="/"
          aria-label="Boards and beyond, home"
        >
          <ToothMark />
          <span>Boards & beyond</span>
        </Link>
        <nav
          className="order-last flex w-full gap-6 md:order-none md:w-auto md:self-stretch md:gap-9"
          aria-label="Main navigation"
        >
          <Link className={navLinkClassName} href="/">
            Itinerary
          </Link>
          <Link
            className={navLinkClassName}
            href="/study"
            aria-current={recap ? undefined : "page"}
          >
            Study guide
          </Link>
          <Link
            className={navLinkClassName}
            href="/study/recap"
            aria-current={recap ? "page" : undefined}
          >
            Recap sheet
          </Link>
        </nav>
        <span className="hidden text-sm text-slate-600 xl:inline">
          Pediatric dental oral boards
        </span>
      </div>
    </header>
  );
}
