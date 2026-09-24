import { BookOpen, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeNotes } from "@/components/theme-notes";
import { pdfSources, studyThemes } from "@/lib/study-themes";

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
              <BookOpen size={16} aria-hidden="true" /> THE DECISIONS THAT MATTER
            </p>
            <h1 className="type-display mt-5 mb-6">
              Know the reason.
              <br />
              <em className="text-pine">Remember the choice.</em>
            </h1>
            <p className="max-w-[620px] text-base leading-relaxed text-muted">
              The PDFs, distilled into themes. Learn the key points, picture the decision, then say
              your answer before revealing the explanation.
            </p>
          </div>
          <aside className="border-l border-line py-4 pl-7 max-md:grid max-md:grid-cols-[46px_1fr] max-md:gap-x-4 max-md:gap-y-0 max-md:rounded-md max-md:border-0 max-md:bg-pine-wash max-md:p-4">
            <strong className="block font-display text-6xl leading-none max-md:row-span-2 max-md:text-5xl">
              {pdfSources.length}
            </strong>
            <span className="text-sm text-muted max-md:font-medium">source PDFs reviewed</span>
          </aside>
        </header>
        <nav
          className="flex flex-wrap gap-2 border-y border-line py-4 md:py-6"
          aria-label="Study themes"
        >
          {studyThemes.map((theme, index) => (
            <a key={theme.id} href={`#${theme.id}`} className="chip">
              <span className="type-data text-xs text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              {theme.shortTitle}
            </a>
          ))}
        </nav>
        <details className="group border-b border-line py-4">
          <summary className="flex items-center gap-2 text-sm font-semibold text-pine-deep">
            Abbreviations used in the maps
            <ChevronDown
              size={16}
              className="transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm text-ink-soft sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["F", "fluoride"],
              ["SDF", "silver diamine fluoride"],
              ["ITR", "interim therapeutic restoration"],
              ["SSC", "stainless steel crown"],
              ["IPT", "indirect pulp treatment"],
              ["VPT", "vital pulp therapy"],
              ["CS", "calcium silicate"],
              ["LSTR", "lesion sterilization and tissue repair"],
              ["RMGIC", "resin-modified glass ionomer cement"],
              ["PMC", "preformed metal crown"],
              ["GA", "general anesthesia"],
              ["NaOCl", "sodium hypochlorite"],
              ["PA", "periapical"],
            ].map(([term, meaning]) => (
              <div className="flex gap-2" key={term}>
                <dt className="min-w-12 font-semibold text-ink">{term}</dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </details>
        {studyThemes.map((theme, index) => (
          <ThemeNotes key={theme.id} theme={theme} index={index} />
        ))}
        <SiteFooter
          tagline="Know the reason. Remember the choice."
          next={{ href: "/study/recap", label: "Finish with your recap" }}
        />
      </main>
    </div>
  );
}
