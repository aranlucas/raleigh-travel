import { BookOpen } from "lucide-react";
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
            <p className="mt-4 text-sm leading-relaxed text-muted max-md:mt-0">
              Overlapping guidance is combined. Each theme links to the original documents and the
              pages behind the notes.
            </p>
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
        <p className="mt-5 max-w-[920px] text-sm leading-relaxed text-muted">
          Start with the memory cue, then rehearse the decisions. These are selected review points,
          not complete treatment protocols. Page references count from the first page of each PDF.
          Source versions are listed within each theme.
        </p>
        {studyThemes.map((theme, index) => (
          <ThemeNotes key={theme.id} theme={theme} index={index} />
        ))}
        <p className="mt-10 text-sm text-muted">
          Independent OCE study notes · Sources reviewed September 23, 2026
        </p>
        <SiteFooter
          tagline="Know the reason. Remember the choice."
          next={{ href: "/study/recap", label: "Finish with your recap" }}
        />
      </main>
    </div>
  );
}
