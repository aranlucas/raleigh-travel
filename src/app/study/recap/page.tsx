import { Leaf } from "lucide-react";
import type { Metadata } from "next";

import { RecapNotes } from "@/components/recap-notes";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StepChain } from "@/components/step-chain";
import { answerFramework, recapSections, readings, studySources } from "@/lib/study";

export const metadata: Metadata = {
  title: "One-page OCE recap · Boards & beyond",
};

export default function RecapPage() {
  return (
    <div className="print:bg-white">
      <a className="skip-link print:hidden" href="#recap-content">
        Skip to recap sheet
      </a>
      <SiteHeader current="recap" />
      <main
        className="page-shell max-w-[66rem] pt-10 md:pt-14 print:max-w-none print:px-0 print:pt-0"
        id="recap-content"
      >
        <article className="card p-10 shadow-card max-md:p-6 max-sm:p-5 print:border-0 print:bg-white print:p-0 print:shadow-none">
          <header className="flex items-center justify-between gap-6 border-b border-line pb-5 max-sm:items-start print:pb-2">
            <div>
              <p className={`eyebrow print:text-[7pt]`}>BOARDS & BEYOND · PEDIATRIC DENTISTRY</p>
              <h1 className="type-title mt-3 print:mt-1 print:text-[27pt]">A calm, clear recap.</h1>
              <p className="mt-2 text-sm text-muted print:mt-1 print:text-[9pt]">
                Sunday: finish by 5 PM. Monday: review 9–9:45 AM, then close the notes.
              </p>
            </div>
            <Leaf
              className="text-pine max-sm:hidden"
              size={34}
              strokeWidth={1.3}
              aria-hidden="true"
            />
          </header>
          <section className="mt-6 mb-1 bg-pine-wash px-5 py-4 print:mt-3 print:mb-0 print:px-3 print:py-2 print:[print-color-adjust:exact]">
            <h2 className="type-subhead print:text-[9pt]">
              Hear the question. Give the answer. Explain why.
            </h2>
            <p className="mt-2 text-base leading-relaxed text-ink-soft print:mt-1 print:text-[9pt] print:leading-normal">
              For a full care plan, follow the sequence below. For a focused question, answer just
              that part. Clarify uncertainty; don’t fill the silence with unrelated facts.
            </p>
            <StepChain text={answerFramework} size="sm" className="mt-3 print:mt-1" />
          </section>
          <div className="grid grid-cols-2 gap-x-8 max-md:grid-cols-1 print:grid-cols-2 print:gap-x-6">
            {recapSections.map((section) => (
              <section
                className="break-inside-avoid border-b border-line py-4 print:py-2"
                key={section.title}
              >
                <h2 className="text-base font-semibold leading-normal print:text-[9pt]">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-ink-soft print:mt-1 print:text-[9pt] print:leading-normal">
                  {section.cue}
                </p>
                <a
                  href={section.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-muted underline underline-offset-2 transition-colors hover:text-pine-deep print:hidden"
                >
                  Source: {section.source.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </section>
            ))}
          </div>
          <section className="mt-5 print:mt-3">
            <h2 className="type-subhead print:text-[9pt]">
              Sedation & emergencies: rehearse the safety system
            </h2>
            <p className="mt-2 text-base leading-relaxed text-ink-soft print:mt-1 print:text-[9pt] print:leading-normal">
              Assessment and airway → appropriate setting and team → monitoring and rescue readiness
              → recovery and discharge. Verify medications, calculations, fasting, and emergency
              algorithms in current source material and your training.
            </p>
            <a
              href={readings.sedation.href}
              className="mt-2 inline-block text-sm text-muted underline underline-offset-2 transition-colors hover:text-pine-deep print:hidden"
              target="_blank"
              rel="noopener noreferrer"
            >
              AAP/AAPD sedation guideline
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </section>
          <RecapNotes />
          <section className="mt-6 flex gap-5 border-y border-line py-4 max-md:block print:mt-2 print:flex print:gap-4 print:py-2">
            <strong className="text-sm tracking-wide print:text-[7pt]">MONDAY, OCTOBER 5</strong>
            <p className="text-sm max-md:mt-2 print:mt-0 print:text-[9pt]">
              2:25 PM walk · 2:45 PM registration
              <br />
              AIME Center · 4208 Six Forks Road · Government photo ID
            </p>
          </section>
          <footer className="mt-4 text-sm leading-relaxed text-muted print:mt-2 print:text-[6.5pt] print:leading-snug">
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
        <SiteFooter
          tagline="Hear the question. Answer it. Explain why."
          next={{ href: "/", label: "Back to your itinerary" }}
        />
      </main>
    </div>
  );
}
