import { ArrowRight, BookOpen, Layers } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allFlashcards } from "@/lib/flashcards";
import { domains } from "@/lib/study";
import { pdfSources, studyThemes } from "@/lib/study-themes";
import { themeDiagrams } from "@/lib/theme-diagrams";

export const metadata: Metadata = {
  title: "OCE theme notes · Boards & beyond",
  description:
    "Concise pediatric oral boards summaries, decision maps, and recall questions, grouped by clinical theme from the source PDFs.",
};

export default function ThemesPage() {
  return (
    <div className="print:bg-white">
      <a className="skip-link print:hidden" href="#theme-content">
        Skip to theme notes
      </a>
      <SiteHeader current="themes" />
      <main className="page-shell" id="theme-content" data-theme-page="true">
        <header className="grid grid-cols-1 items-center gap-6 pt-10 pb-8 md:grid-cols-[minmax(0,1fr)_225px] md:gap-14 md:pt-14 md:pb-9">
          <div>
            <p className="eyebrow">
              <BookOpen size={16} aria-hidden="true" /> THEME NOTES
            </p>
            <h1 className="type-display mt-5 mb-6">
              Nine clinical themes
              <br />
              <em className="text-pine">to review.</em>
            </h1>
            <p className="max-w-[620px] text-base leading-relaxed text-muted">
              The PDFs, distilled into nine themes. Pick one, learn the key points, trace the
              decision diagrams, then drill the flashcards out loud.
            </p>
          </div>
          <aside className="border-l border-line py-4 pl-7 max-md:grid max-md:grid-cols-[46px_1fr] max-md:gap-x-4 max-md:gap-y-0 max-md:rounded-md max-md:border-0 max-md:bg-pine-wash max-md:p-4">
            <strong className="block font-display text-6xl leading-none max-md:row-span-2 max-md:text-5xl">
              {pdfSources.length}
            </strong>
            <span className="text-sm text-muted max-md:font-medium">source PDFs reviewed</span>
          </aside>
        </header>
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-5">
          <p className="text-[0.9375rem] text-muted">
            Each theme has key points, decision diagrams, and a flashcard deck.
          </p>
          <Link className="btn btn-primary" href="/study/flashcards">
            <Layers size={16} aria-hidden="true" /> Mixed flashcards · {allFlashcards.length}
          </Link>
        </div>
        <ol className="mt-8 grid list-none gap-4 md:grid-cols-2 xl:grid-cols-3">
          {studyThemes.map((theme) => {
            const diagramCount = themeDiagrams[theme.id]?.length ?? 0;
            const cardCount = allFlashcards.filter((card) => card.themeId === theme.id).length;
            const weight = domains
              .filter((domain) => theme.domainIds.includes(domain.id))
              .reduce((total, domain) => total + domain.weight, 0);
            return (
              <li key={theme.id}>
                <Link
                  className="card group flex h-full flex-col p-6 text-ink no-underline hover:border-pine hover:shadow-card"
                  href={`/study/themes/${theme.id}`}
                  id={theme.id}
                >
                  <span className="flex items-center gap-3">
                    {weight > 0 ? (
                      <>
                        <span
                          className="relative h-1.5 w-16 overflow-hidden rounded-full bg-sunk"
                          aria-hidden="true"
                        >
                          <span
                            className="absolute inset-y-0 left-0 rounded-full bg-pine"
                            style={{ width: `${weight}%` }}
                          />
                        </span>
                        <span className="type-data text-xs text-muted">
                          {weight}% of the blueprint
                        </span>
                      </>
                    ) : (
                      <span className="type-data text-xs text-muted">Exam technique</span>
                    )}
                    <span className="flex-1" />
                    <ArrowRight
                      className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-pine"
                      size={17}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="type-heading mt-3 group-hover:text-pine">{theme.title}</span>
                  <span className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {theme.summary}
                  </span>
                  <span className="mt-4 rounded-md bg-pine-wash px-3 py-2 font-display text-[0.9375rem] leading-snug text-pine-deep">
                    {theme.memoryCue}
                  </span>
                  <span className="type-data mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5 text-xs text-muted">
                    <span>{theme.points.length} key points</span>
                    {diagramCount > 0 ? (
                      <span>
                        {diagramCount} {diagramCount === 1 ? "diagram" : "diagrams"}
                      </span>
                    ) : null}
                    <span>{cardCount} flashcards</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
        <SiteFooter next={{ href: "/study/recap", label: "Finish with your recap" }} />
      </main>
    </div>
  );
}
