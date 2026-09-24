import { ArrowLeft, ArrowRight, BookOpen, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { StudyHeader } from "@/components/study-header";
import { ThemeNotes } from "@/components/theme-notes";
import { pdfSources, studyThemes } from "@/lib/study-themes";

const textLinkClasses =
  "inline-flex items-center gap-2 text-sm font-medium leading-normal text-emerald-700 underline decoration-1 underline-offset-4 transition-colors hover:text-amber-700";

export const metadata: Metadata = {
  title: "OCE theme notes · Boards & beyond",
  description:
    "Concise pediatric oral boards summaries, decision maps, and recall questions, grouped by clinical theme from the source PDFs.",
};

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 print:bg-white">
      <a
        className="fixed -top-20 left-5 z-10 bg-slate-900 px-5 py-3 text-white focus:top-3 print:hidden"
        href="#theme-content"
      >
        Skip to theme notes
      </a>
      <StudyHeader />
      <main
        className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-11"
        id="theme-content"
        data-theme-page="true"
      >
        <div className="flex flex-wrap justify-between gap-3 pt-6 md:gap-5 md:pt-8">
          <Link href="/study" className={textLinkClasses}>
            <ArrowLeft size={15} aria-hidden="true" /> Your practice plan
          </Link>
          <Link href="/study/recap" className={textLinkClasses}>
            <FileText size={15} aria-hidden="true" /> One-page recap
          </Link>
        </div>
        <header className="grid grid-cols-1 items-center gap-6 py-8 md:grid-cols-[minmax(0,1fr)_225px] md:gap-14 md:py-10 md:pb-9">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
              <BookOpen size={16} aria-hidden="true" /> THE DECISIONS THAT MATTER
            </p>
            <h1 className="mt-4 mb-6 font-sans text-5xl font-medium leading-tight tracking-tight md:text-6xl">
              Know the reason.
              <br />
              <em className="font-normal text-emerald-700">Remember the choice.</em>
            </h1>
            <p className="max-w-[620px] text-base leading-relaxed text-slate-600">
              The PDFs, distilled into themes. Learn the key points, picture the decision, then say
              your answer before revealing the explanation.
            </p>
          </div>
          <aside className="border-l border-slate-200 py-4 pl-7 max-md:grid max-md:grid-cols-[46px_1fr] max-md:gap-x-4 max-md:gap-y-0 max-md:rounded-md max-md:border-0 max-md:bg-emerald-50 max-md:p-4">
            <strong className="block text-6xl font-medium leading-normal max-md:row-span-2 max-md:text-5xl">
              {pdfSources.length}
            </strong>
            <span className="text-sm text-slate-600 max-md:font-medium">source PDFs reviewed</span>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 max-md:mt-0">
              Overlapping guidance is combined. Each theme links to the original documents and the
              pages behind the notes.
            </p>
          </aside>
        </header>
        <nav
          className="flex flex-wrap gap-2 border-y border-slate-200 py-4 md:py-6"
          aria-label="Study themes"
        >
          {studyThemes.map((theme, index) => (
            <a
              key={theme.id}
              href={`#${theme.id}`}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-2 py-2 text-sm no-underline transition-colors hover:border-emerald-300 hover:bg-emerald-50 md:px-3"
            >
              <span className="text-sm text-slate-500">{String(index + 1).padStart(2, "0")}</span>
              {theme.shortTitle}
            </a>
          ))}
        </nav>
        <p className="mt-5 max-w-[920px] text-sm leading-relaxed text-slate-600">
          Start with the memory cue, then rehearse the decisions. These are selected review points,
          not complete treatment protocols. Page references count from the first page of each PDF.
          Source versions are listed within each theme.
        </p>
        {studyThemes.map((theme, index) => (
          <ThemeNotes key={theme.id} theme={theme} index={index} />
        ))}
        <footer className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 py-6 text-sm text-slate-600 md:mt-15 md:flex-row md:items-center md:gap-6 md:py-7">
          <span>Independent OCE study notes · Sources reviewed September 23, 2026</span>
          <Link className={textLinkClasses} href="/study/recap">
            Finish with your recap <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </footer>
      </main>
    </div>
  );
}
