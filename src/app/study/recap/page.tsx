import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { RecapNotes } from "@/components/recap-notes";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StepChain } from "@/components/step-chain";
import { recapNumbers, recapThemes } from "@/lib/recap";
import { answerFramework } from "@/lib/study";

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
        className="page-shell max-w-[72rem] pt-10 md:pt-14 print:max-w-none print:px-0 print:pt-0"
        id="recap-content"
      >
        <article className="card p-10 shadow-card max-md:p-6 max-sm:p-5 print:border-0 print:bg-white print:p-0 print:shadow-none">
          <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line pb-5 print:flex-nowrap print:pb-1.5">
            <div>
              <p className="eyebrow print:text-[6.5pt]">PEDIATRIC DENTISTRY ORAL CLINICAL EXAM</p>
              <h1 className="type-title mt-2 print:mt-0 print:text-[18pt]">One-page recap</h1>
            </div>
            <div className="text-sm leading-snug text-muted print:text-right print:text-[7pt]">
              <p>
                <strong className="font-semibold text-ink">Monday, Oct 5</strong> · read once 9–9:45
                AM · 2:25 PM walk · 2:45 PM registration
              </p>
              <p>AIME Center, 4208 Six Forks Road · government photo ID</p>
              <p className="mt-1 print:mt-0">
                <strong className="font-semibold text-ink">Bold</strong> = the trigger · → = what
                you say · <span className="text-ochre">Trap</span> = the classic wrong answer
              </p>
            </div>
          </header>

          <section
            className="mt-5 grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 max-md:grid-cols-1 print:mt-2 print:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] print:gap-3"
            aria-label="How to answer and numbers to know"
          >
            <div className="rounded-md bg-pine-wash px-5 py-4 print:px-2.5 print:py-1.5 print:[print-color-adjust:exact]">
              <h2 className="type-subhead print:text-[8pt] print:leading-tight">
                Hear the question. Answer it. Explain why.
              </h2>
              <StepChain
                text={answerFramework}
                size="sm"
                className="mt-2 print:mt-1 print:gap-y-0.5 print:[&_span]:px-1.5 print:[&_span]:text-[6.5pt]"
              />
              <p className="mt-2 text-sm leading-snug text-ink-soft print:mt-1 print:text-[6.5pt]">
                Full care plan: walk the chain. Focused question: answer that part first. Unsure:
                say what would change your mind.
              </p>
            </div>
            <div>
              <h2 className="eyebrow print:text-[6.5pt]">Numbers to know</h2>
              <dl className="mt-2 grid grid-cols-3 gap-x-4 gap-y-2 max-sm:grid-cols-2 print:mt-0.5 print:gap-x-2 print:gap-y-0.5">
                {recapNumbers.map((item) => (
                  <div className="border-t border-line pt-1.5 print:pt-0.5" key={item.label}>
                    <dt className="type-data text-base font-semibold text-pine-deep print:text-[8pt]">
                      {item.value}
                    </dt>
                    <dd className="text-sm leading-snug text-ink-soft print:text-[6.5pt]">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <div className="mt-6 columns-2 gap-x-8 max-md:columns-1 print:mt-2 print:columns-2 print:gap-x-4">
            {recapThemes.map(({ theme, weight, rules }) => (
              <section
                className="mb-5 break-inside-avoid border-t-2 border-ink pt-2.5 print:mb-1 print:border-t print:pt-1"
                key={theme.id}
                aria-labelledby={`recap-${theme.id}`}
              >
                <header className="flex items-baseline gap-2.5 print:gap-1.5">
                  <span className="type-data text-sm font-semibold text-pine print:text-[7pt]">
                    {weight}%
                  </span>
                  <h2
                    className="text-base font-semibold leading-snug print:text-[8pt]"
                    id={`recap-${theme.id}`}
                  >
                    {theme.shortTitle}
                  </h2>
                  <Link
                    className="link-quiet ml-auto inline-flex items-center gap-0.5 text-xs whitespace-nowrap print:hidden"
                    href={`/study/themes/${theme.id}`}
                  >
                    Full notes <ArrowUpRight size={12} aria-hidden="true" />
                  </Link>
                </header>
                <p className="mt-1 text-sm font-medium italic text-pine-deep print:mt-0 print:text-[7pt] print:leading-snug">
                  {theme.memoryCue}
                </p>
                <ul className="mt-2 space-y-1 print:mt-0.5 print:space-y-0">
                  {rules.map((rule) => (
                    <li
                      className="text-sm leading-snug text-ink-soft print:text-[6.5pt] print:leading-[1.25]"
                      key={rule.when}
                    >
                      <strong className="font-semibold text-ink">{rule.when}</strong>
                      <span className="text-muted" aria-hidden="true">
                        {" "}
                        →{" "}
                      </span>
                      <span className="sr-only">: </span>
                      {rule.say}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 rounded-sm bg-ochre-wash px-2 py-1 text-sm leading-snug text-ink-soft print:mt-0.5 print:px-1 print:py-0 print:text-[6.5pt] print:leading-[1.25] print:[print-color-adjust:exact]">
                  <strong className="font-semibold text-ochre">Trap:</strong> {theme.pitfall.text}
                </p>
              </section>
            ))}
            <div className="break-inside-avoid">
              <RecapNotes />
            </div>
          </div>
        </article>
        <SiteFooter next={{ href: "/", label: "Back to your itinerary" }} />
      </main>
    </div>
  );
}
