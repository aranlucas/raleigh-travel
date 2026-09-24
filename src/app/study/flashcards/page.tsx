import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FlashcardDeck, FlashcardPrintList } from "@/components/flashcard-deck";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allFlashcards } from "@/lib/flashcards";
import { studyThemes } from "@/lib/study-themes";

export const metadata: Metadata = {
  title: "Mixed flashcards · Boards & beyond",
  description: "Every theme's flashcards in one deck for a shuffled pediatric oral boards review.",
};

export default function FlashcardsPage() {
  return (
    <div className="print:bg-white">
      <a className="skip-link print:hidden" href="#flashcards-content">
        Skip to flashcards
      </a>
      <SiteHeader current="themes" />
      <main className="page-shell" id="flashcards-content">
        <nav className="pt-8 print:hidden" aria-label="Themes">
          <Link className="link" href="/study/themes">
            <ArrowLeft size={15} aria-hidden="true" /> All themes
          </Link>
        </nav>
        <header className="pt-8 pb-8">
          <p className="eyebrow">
            {allFlashcards.length} cards · {studyThemes.length} themes
          </p>
          <h1 className="type-display mt-4">
            All flashcards,
            <br />
            <span className="text-pine">every theme.</span>
          </h1>
          <p className="type-lead mt-5 max-w-[56ch]">
            Every theme’s cards in one deck. Cards you mark here are also marked on each theme’s
            page.
          </p>
        </header>
        <div className="max-w-[48rem] border-t border-line pt-8">
          <FlashcardDeck cards={allFlashcards} showTheme />
          <FlashcardPrintList cards={allFlashcards} />
        </div>
        <SiteFooter next={{ href: "/study/recap", label: "Finish with your recap" }} />
      </main>
    </div>
  );
}
