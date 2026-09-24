import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeDetail } from "@/components/theme-notes";
import { studyThemes } from "@/lib/study-themes";

export const dynamicParams = false;

type ThemeProps = Readonly<{ params: Promise<Readonly<{ id: string }>> }>;

export function generateStaticParams() {
  return studyThemes.map((theme) => ({ id: theme.id }));
}

function findTheme(id: string) {
  const index = studyThemes.findIndex((theme) => theme.id === id);
  return index === -1 ? null : { theme: studyThemes[index], index };
}

export async function generateMetadata({ params }: ThemeProps): Promise<Metadata> {
  const found = findTheme((await params).id);
  return {
    title: `${found?.theme.shortTitle ?? "Theme"} · Boards & beyond`,
    description: found?.theme.summary,
  };
}

export default async function ThemePage({ params }: ThemeProps) {
  const found = findTheme((await params).id);
  if (found === null) {
    notFound();
  }
  const { theme, index } = found;
  const previous = index > 0 ? studyThemes[index - 1] : undefined;
  const next = studyThemes.at(index + 1);

  return (
    <div className="print:bg-white">
      <a className="skip-link print:hidden" href="#theme-content">
        Skip to theme
      </a>
      <SiteHeader current="themes" />
      <main className="page-shell" id="theme-content">
        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-8 print:hidden"
          aria-label="Themes"
        >
          <Link className="link" href="/study/themes">
            <ArrowLeft size={15} aria-hidden="true" /> All themes
          </Link>
          <Link className="link" href="/study/flashcards">
            <Layers size={15} aria-hidden="true" /> Mixed flashcards
          </Link>
          <span className="type-data ml-auto text-sm text-muted">
            Theme {index + 1} of {studyThemes.length}
          </span>
        </nav>
        <ThemeDetail theme={theme} />
        <nav
          className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2 print:hidden"
          aria-label="Other themes"
        >
          {previous === undefined ? (
            <span />
          ) : (
            <Link
              className="card flex flex-col p-4 text-ink no-underline hover:border-pine"
              href={`/study/themes/${previous.id}`}
            >
              <span className="eyebrow">
                <ArrowLeft size={13} aria-hidden="true" /> Previous theme
              </span>
              <span className="type-subhead mt-1">{previous.shortTitle}</span>
            </Link>
          )}
          {next === undefined ? (
            <Link
              className="card flex flex-col p-4 text-right text-ink no-underline hover:border-pine sm:items-end"
              href="/study/recap"
            >
              <span className="eyebrow">
                Finish <ArrowRight size={13} aria-hidden="true" />
              </span>
              <span className="type-subhead mt-1">Your one-page recap</span>
            </Link>
          ) : (
            <Link
              className="card flex flex-col p-4 text-right text-ink no-underline hover:border-pine sm:items-end"
              href={`/study/themes/${next.id}`}
            >
              <span className="eyebrow">
                Next theme <ArrowRight size={13} aria-hidden="true" />
              </span>
              <span className="type-subhead mt-1">{next.shortTitle}</span>
            </Link>
          )}
        </nav>
        <SiteFooter />
      </main>
    </div>
  );
}
