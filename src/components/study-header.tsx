import Link from "next/link";

import { ToothMark } from "./ui";

export function StudyHeader({ recap = false }: Readonly<{ recap?: boolean }>) {
  return (
    <header className="site-header study-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Boards and beyond, home">
          <ToothMark />
          <span>Boards & beyond</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/">Itinerary</Link>
          <Link href="/study" aria-current={recap ? undefined : "page"}>
            Study guide
          </Link>
          <Link href="/study/recap" aria-current={recap ? "page" : undefined}>
            Recap sheet
          </Link>
        </nav>
        <span className="study-header-note">Pediatric dental oral boards</span>
      </div>
    </header>
  );
}
