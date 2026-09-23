import { ArrowLeft, ArrowRight, BookOpen, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { StudyHeader } from "@/components/study-header";
import { ThemeNotes } from "@/components/theme-notes";
import { pdfSources, studyThemes } from "@/lib/study-themes";

import "../study.css";
import "./themes.css";

export const metadata: Metadata = {
  title: "OCE theme notes · Boards & beyond",
  description:
    "Concise pediatric oral boards summaries, decision maps, and recall questions, grouped by clinical theme from the source PDFs.",
};

export default function ThemesPage() {
  return (
    <div className="themes-app">
      <a className="skip-link" href="#theme-content">
        Skip to theme notes
      </a>
      <StudyHeader />
      <main className="page-shell themes-shell" id="theme-content">
        <div className="themes-breadcrumb">
          <Link href="/study" className="text-link">
            <ArrowLeft size={15} aria-hidden="true" /> Your practice plan
          </Link>
          <Link href="/study/recap" className="text-link">
            <FileText size={15} aria-hidden="true" /> One-page recap
          </Link>
        </div>
        <header className="themes-hero">
          <div>
            <p className="eyebrow">
              <BookOpen size={16} aria-hidden="true" /> THE DECISIONS THAT MATTER
            </p>
            <h1>
              Know the reason.
              <br />
              <em>Remember the choice.</em>
            </h1>
            <p>
              The PDFs, distilled into themes. Learn the key points, picture the decision, then say
              your answer before revealing the explanation.
            </p>
          </div>
          <aside>
            <strong>{pdfSources.length}</strong>
            <span>source PDFs reviewed</span>
            <p>
              Overlapping guidance is combined. Each theme links to the original documents and the
              pages behind the notes.
            </p>
          </aside>
        </header>
        <nav className="theme-jump-links" aria-label="Study themes">
          {studyThemes.map((theme, index) => (
            <a key={theme.id} href={`#${theme.id}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {theme.shortTitle}
            </a>
          ))}
        </nav>
        <p className="themes-reading-note">
          Start with the memory cue, then rehearse the decisions. These are selected review points,
          not complete treatment protocols. Page references count from the first page of each PDF.
          Source versions are listed within each theme.
        </p>
        {studyThemes.map((theme, index) => (
          <ThemeNotes key={theme.id} theme={theme} index={index} />
        ))}
        <footer className="site-footer">
          <span>Independent OCE study notes · Sources reviewed September 23, 2026</span>
          <Link className="text-link" href="/study/recap">
            Finish with your recap <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </footer>
      </main>
    </div>
  );
}
