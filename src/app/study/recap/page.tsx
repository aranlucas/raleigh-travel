import { ArrowLeft, Leaf } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { RecapNotes, RecapPrintButton } from "@/components/recap-notes";
import { StudyHeader } from "@/components/study-header";
import { recapSections, readings, studySources } from "@/lib/study";

const eyebrowClass =
  "flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-600";
const textLinkClass =
  "inline-flex items-center gap-2 text-sm font-medium leading-normal text-emerald-700 underline decoration-1 underline-offset-4 transition-colors hover:text-amber-700 motion-reduce:transition-none";

export const metadata: Metadata = {
  title: "One-page OCE recap · Boards & beyond",
};

export default function RecapPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 print:bg-white">
      <a
        className="fixed -top-20 left-5 z-10 bg-slate-900 px-5 py-3 text-white no-underline focus:top-3 print:hidden"
        href="#recap-content"
      >
        Skip to recap sheet
      </a>
      <StudyHeader recap />
      <main
        className="mx-auto max-w-[1060px] px-11 pb-15 max-[1190px]:px-8 max-[760px]:px-5 print:max-w-none print:px-0 print:pb-0"
        id="recap-content"
      >
        <div className="flex items-center justify-between gap-5 py-8 max-[760px]:flex-wrap max-[760px]:py-6 print:hidden">
          <Link className={textLinkClass} href="/study">
            <ArrowLeft size={16} aria-hidden="true" /> Back to the study guide
          </Link>
          <Link className={textLinkClass} href="/study/themes">
            Theme notes & decisions
          </Link>
          <RecapPrintButton />
        </div>
        <article className="border border-slate-200 bg-white p-10 shadow-sm max-[760px]:p-6 max-[420px]:p-5 print:border-0 print:bg-white print:p-0 print:shadow-none">
          <header className="flex items-center justify-between gap-6 border-b border-slate-200 pb-5 max-[420px]:items-start print:pb-2">
            <div>
              <p className={`${eyebrowClass} print:text-[7pt]`}>
                BOARDS & BEYOND · PEDIATRIC DENTISTRY
              </p>
              <h1 className="mt-2 font-sans text-5xl font-medium leading-tight tracking-tight max-[760px]:text-4xl print:mt-1 print:text-[27pt]">
                A calm, clear recap.
              </h1>
              <p className="mt-2 text-sm text-slate-600 print:mt-1 print:text-[9pt]">
                Sunday: finish by 5 PM. Monday: review 9–9:45 AM, then close the notes.
              </p>
            </div>
            <Leaf
              className="text-emerald-700 max-[420px]:hidden"
              size={34}
              strokeWidth={1.3}
              aria-hidden="true"
            />
          </header>
          <section className="mt-6 mb-1 bg-emerald-50 px-5 py-4 print:mt-3 print:mb-0 print:px-3 print:py-2 print:[print-color-adjust:exact]">
            <h2 className="font-sans text-lg font-semibold leading-normal print:text-[9pt]">
              Hear the question. Give the answer. Explain why.
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-800 print:mt-1 print:text-[9pt] print:leading-normal">
              For a full care plan:{" "}
              <strong>findings → diagnosis → options → recommendation → follow-up.</strong> For a
              focused question, answer just that part. Clarify uncertainty; don’t fill the silence
              with unrelated facts.
            </p>
          </section>
          <div className="grid grid-cols-2 gap-x-8 max-[760px]:grid-cols-1 print:grid-cols-2 print:gap-x-6">
            {recapSections.map((section) => (
              <section
                className="break-inside-avoid border-b border-slate-200 py-4 print:py-2"
                key={section.title}
              >
                <h2 className="font-sans text-base font-semibold leading-normal print:text-[9pt]">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-slate-800 print:mt-1 print:text-[9pt] print:leading-normal">
                  {section.cue}
                </p>
                <a
                  href={section.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-slate-600 underline underline-offset-2 transition-colors hover:text-amber-700 print:hidden"
                >
                  Source: {section.source.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </section>
            ))}
          </div>
          <section className="mt-5 print:mt-3">
            <h2 className="font-sans text-lg font-semibold leading-normal print:text-[9pt]">
              Sedation & emergencies: rehearse the safety system
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-800 print:mt-1 print:text-[9pt] print:leading-normal">
              Assessment and airway → appropriate setting and team → monitoring and rescue readiness
              → recovery and discharge. Verify medications, calculations, fasting, and emergency
              algorithms in current source material and your training.
            </p>
            <a
              href={readings.sedation.href}
              className="mt-2 inline-block text-sm text-slate-600 underline underline-offset-2 transition-colors hover:text-amber-700 print:hidden"
              target="_blank"
              rel="noopener noreferrer"
            >
              AAP/AAPD sedation guideline
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </section>
          <RecapNotes />
          <section className="mt-6 flex gap-5 border-y border-slate-200 py-4 max-[760px]:block print:mt-2 print:flex print:gap-4 print:py-2">
            <strong className="text-sm tracking-wide print:text-[7pt]">MONDAY, OCTOBER 5</strong>
            <p className="text-sm max-[760px]:mt-2 print:mt-0 print:text-[9pt]">
              2:25 PM walk · 2:45 PM registration
              <br />
              AIME Center · 4208 Six Forks Road · Government photo ID
            </p>
          </section>
          <footer className="mt-4 text-sm leading-relaxed text-slate-600 print:mt-2 print:text-[6.5pt] print:leading-snug">
            <p>
              Independent review aid, not a clinical protocol or an official ABPD handout.
              Percentages combine related blueprint domains. Use current candidate instructions for
              exam logistics.
            </p>
            <p className="mt-1">
              Sources reviewed September 23, 2026:{" "}
              <a href={studySources.blueprint}>ABPD blueprint</a> ·{" "}
              <a href={studySources.communication}>communication</a> ·{" "}
              <a href={studySources.manual}>AAPD Reference Manual</a>. Full links and practice
              cases: /study
            </p>
          </footer>
        </article>
      </main>
    </div>
  );
}
