import { ArrowRight, BookOpen, FileText, Leaf } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CoverageGrid } from "@/components/coverage-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StepChain } from "@/components/step-chain";
import { ExternalLink } from "@/components/ui";
import {
  answerFramework,
  domains,
  officialResources,
  practiceBlocks,
  studySources,
} from "@/lib/study";

export const metadata: Metadata = {
  title: "OCE study guide · Boards & beyond",
  description:
    "A focused pediatric dental oral boards review mapped to the Raleigh study schedule, with official ABPD and AAPD resources.",
};

export default function StudyPage() {
  return (
    <div className="print:bg-white">
      <a className="skip-link print:hidden" href="#study-content">
        Skip to study guide
      </a>
      <SiteHeader current="study" />
      <main className="page-shell" id="study-content">
        <section className="grid grid-cols-[minmax(0,1fr)_330px] items-center gap-20 pt-14 pb-13 max-lg:grid-cols-[minmax(0,1fr)_280px] max-lg:gap-9 max-md:grid-cols-1 max-md:gap-7 max-md:pt-10 max-md:pb-8">
          <div>
            <p className="eyebrow">
              <BookOpen size={16} aria-hidden="true" /> ABPD ORAL CLINICAL EXAM
            </p>
            <h1 className="type-display mt-5 mb-6">
              Study plan
              <br />
              <em className="text-pine">for the oral exam.</em>
            </h1>
            <p className="type-lead max-w-[36rem]">
              Seven timed sessions across the weekend, covering all ten ABPD blueprint domains. Say
              your answers out loud and check anything uncertain against the cited source.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 max-sm:gap-4">
              <Link className="btn btn-primary" href="/study/themes">
                Learn the themes <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a className="link" href="#sessions">
                Your practice plan
              </a>
              <Link className="link" href="/study/recap">
                <FileText size={16} aria-hidden="true" /> One-page recap
              </Link>
            </div>
          </div>
          <aside className="panel p-7 max-md:p-6">
            <Leaf
              className="text-pine max-md:hidden"
              size={25}
              strokeWidth={1.4}
              aria-hidden="true"
            />
            <h2 className="type-heading mt-3">At a glance</h2>
            <dl className="mt-6 mb-4">
              <div className="flex justify-between gap-2 border-t border-line py-2 text-sm">
                <dt className="text-muted">Focused preparation</dt>
                <dd className="m-0 font-semibold">6½ hours</dd>
              </div>
              <div className="flex justify-between gap-2 border-t border-line py-2 text-sm">
                <dt className="text-muted">Blueprint domains</dt>
                <dd className="m-0 font-semibold">All 10</dd>
              </div>
              <div className="flex justify-between gap-2 border-t border-line py-2 text-sm">
                <dt className="text-muted">Monday stopping point</dt>
                <dd className="m-0 font-semibold">9:45 AM</dd>
              </div>
            </dl>
            <p className="text-sm text-muted">
              Choose the readings for your weak areas. This weekend is for consolidation, not
              reading the entire manual.
            </p>
          </aside>
        </section>

        <section
          className="grid grid-cols-[280px_minmax(0,1fr)] gap-10 border-y border-line py-7 max-lg:grid-cols-[245px_minmax(0,1fr)] max-lg:gap-6 max-md:grid-cols-1 max-md:gap-4"
          aria-labelledby="answer-heading"
        >
          <div>
            <p className="eyebrow">BEFORE EVERY CASE</p>
            <h2 className="type-heading mt-2" id="answer-heading">
              Answer what was asked.
            </h2>
          </div>
          <div>
            <p className="type-lead text-pine-deep">
              Pause, clarify if needed, then give a direct answer with a reason. When a full plan is
              requested, walk through the sequence below. Use only the parts relevant to the
              question.
            </p>
            <StepChain text={answerFramework} size="sm" className="mt-4" />
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Examiners assess clinical reasoning, communication, and professionalism, rating each
              1–3: inaccurate, incomplete, or fully demonstrated.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <ExternalLink label="Communication guidance" href={studySources.communication} />
              <ExternalLink label="Official scoring rubric" href={studySources.blueprint} />
            </div>
          </div>
        </section>

        <section className="scroll-mt-6 pt-12" id="sessions" aria-labelledby="sessions-heading">
          <p className="eyebrow">YOUR PRACTICE SESSIONS</p>
          <h2 className="type-title mt-3" id="sessions-heading">
            Practice sessions
          </h2>
          <p className="mt-3 max-w-[60ch] text-base text-muted">
            Open a session when it is time to study. Each one has timed steps, the blueprint domains
            it covers, and what comes next in your day.
          </p>
          <ol className="mt-7 grid list-none gap-3 md:grid-cols-2">
            {practiceBlocks.map((block, index) => (
              <li key={block.id}>
                <Link
                  className="card group flex h-full gap-4 p-5 text-ink no-underline hover:border-pine sm:p-6"
                  href={`/study/sessions/${block.id}`}
                  id={block.id}
                >
                  <span className="type-data pt-1 text-sm text-muted" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="eyebrow">
                      {block.day} · {block.time} · {block.minutes} min
                    </span>
                    <span className="type-heading mt-2 group-hover:text-pine">{block.title}</span>
                    <span className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                      {block.purpose}
                    </span>
                    {block.domains.length > 0 ? (
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {block.domains.map((id) => (
                          <span
                            className="rounded-full bg-pine-wash px-2 py-0.5 text-xs text-pine-deep"
                            key={id}
                          >
                            {domains.find((domain) => domain.id === id)?.title ?? id}
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </span>
                  <ArrowRight
                    className="mt-1 text-muted transition-transform group-hover:translate-x-0.5"
                    size={17}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="panel mt-12 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-12 scroll-mt-6 p-10 max-lg:gap-9 max-lg:grid-cols-1 max-md:mt-8 max-md:gap-6 max-md:p-5"
          id="blueprint"
          aria-labelledby="blueprint-heading"
        >
          <div>
            <p className="eyebrow">ALL TEN DOMAINS</p>
            <h2 className="type-title mt-3" id="blueprint-heading">
              Blueprint coverage by session
            </h2>
            <p className="my-4 text-base text-pine">
              The percentages are ABPD’s published blueprint weights. They describe exam coverage,
              not the number of minutes to spend studying. The grid shows where each domain comes up
              in your practice plan. Labels are shortened here; open the original for every task
              statement.
            </p>
            <ExternalLink label="Complete ABPD blueprint" href={studySources.blueprint} />
          </div>
          <CoverageGrid />
        </section>

        <section
          className="scroll-mt-6 pt-13"
          id="official-resources"
          aria-labelledby="resources-heading"
        >
          <p className="eyebrow">OFFICIAL</p>
          <h2 className="type-title mt-3" id="resources-heading">
            ABPD candidate resources
          </h2>
          <p className="mt-4 max-w-[780px] text-base text-muted">
            ABPD’s public candidate preparation resources, together in one place.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-x-8 max-md:grid-cols-2 max-md:gap-x-6 max-sm:grid-cols-1">
            {officialResources.map((resource) => (
              <article className="border-t border-line py-5" key={resource.href}>
                <ExternalLink {...resource} />
                <p className="mt-2 text-sm text-muted">{resource.note}</p>
              </article>
            ))}
          </div>
          <div className="callout mt-5 flex items-start gap-6 p-7 max-md:gap-4 max-md:p-6">
            <BookOpen className="max-md:hidden" size={26} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <h3 className="type-heading">AAPD Reference Manual · 2026–2027</h3>
              <p className="mt-3 text-base text-muted">
                New or revised for 2026 and worth a skim: acute pain management, antibiotic
                prophylaxis, the new child abuse and neglect policy, special health care needs, pulp
                therapy, antibiotic therapy, and recordkeeping. The full manual also covers
                sealants, SDF, nitrous oxide, local anesthesia, and periodontal care.
              </p>
              <div className="mt-4">
                <ExternalLink
                  label="Open the complete AAPD manual & PDFs"
                  href={studySources.manual}
                />
              </div>
            </div>
          </div>
        </section>
        <SiteFooter next={{ href: "/study/themes", label: "Learn the themes" }} />
      </main>
    </div>
  );
}
