import { ArrowRight, BookOpen, ChevronDown, Clock3, FileText, Leaf } from "lucide-react";
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
import { studyThemes } from "@/lib/study-themes";

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
              <BookOpen size={16} aria-hidden="true" /> YOUR OCE FIELD NOTES
            </p>
            <h1 className="type-display mt-5 mb-6">
              Practice with a plan.
              <br />
              <em className="text-pine">Then take a breath.</em>
            </h1>
            <p className="type-lead max-w-[36rem]">
              A focused crash course for pediatric dental oral boards. Review the decision points,
              say your reasoning out loud, and use the original sources to close the gaps.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 max-sm:gap-4">
              <Link className="btn btn-primary" href="/study/themes">
                Learn the themes <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a className="link" href="#sat-cases">
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
            <h2 className="type-heading mt-3">
              Enough structure.
              <br className="max-md:hidden" /> Room to breathe.
            </h2>
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

        <div className="mt-10 grid grid-cols-[245px_minmax(0,1fr)] items-start gap-19 max-lg:grid-cols-[190px_minmax(0,1fr)] max-lg:gap-9 max-md:mt-7 max-md:block">
          <aside className="sticky top-5 max-md:static max-md:mb-7">
            <nav
              className="flex flex-col max-md:grid max-md:grid-cols-2 max-md:gap-x-2 max-md:gap-y-1"
              aria-label="Practice blocks"
            >
              <p className={`eyebrow mb-4 max-md:col-span-full max-md:mb-2`}>
                YOUR PRACTICE BLOCKS
              </p>
              {practiceBlocks.map((block) => (
                <a
                  className="flex flex-col border-l-2 border-line px-4 py-3 no-underline hover:border-pine/40 hover:bg-pine-wash max-lg:pl-2 max-md:px-3 max-md:py-2"
                  key={block.id}
                  href={`#${block.id}`}
                >
                  <span className="text-sm text-muted">{block.day}</span>
                  <strong className="text-sm font-medium">{block.time}</strong>
                  <small className="mt-0 text-sm text-muted max-md:hidden">{block.title}</small>
                </a>
              ))}
              <a
                className="flex flex-col border-l-2 border-line px-4 py-3 no-underline hover:border-pine/40 hover:bg-pine-wash max-lg:pl-2 max-md:px-3 max-md:py-2"
                href="#blueprint"
              >
                <strong className="text-sm font-medium">Blueprint at a glance</strong>
              </a>
              <a
                className="flex flex-col border-l-2 border-line px-4 py-3 no-underline hover:border-pine/40 hover:bg-pine-wash max-lg:pl-2 max-md:px-3 max-md:py-2"
                href="#official-resources"
              >
                <strong className="text-sm font-medium">Official resource library</strong>
              </a>
              <Link
                className="flex flex-col border-l-2 border-line px-4 py-3 no-underline hover:border-pine/40 hover:bg-pine-wash max-lg:pl-2 max-md:px-3 max-md:py-2"
                href="/study/recap"
              >
                <strong className="text-sm font-medium">Print your recap sheet ↗</strong>
              </Link>
              <Link
                className="flex flex-col border-l-2 border-line px-4 py-3 no-underline hover:border-pine/40 hover:bg-pine-wash max-lg:pl-2 max-md:px-3 max-md:py-2"
                href="/study/themes"
              >
                <strong className="text-sm font-medium">Theme notes & decision maps ↗</strong>
              </Link>
            </nav>
          </aside>
          <div className="min-w-0">
            {practiceBlocks.map((block, index) => (
              <section
                className="scroll-mt-6 border-b border-line py-9"
                id={block.id}
                key={block.id}
                aria-labelledby={`${block.id}-heading`}
              >
                <div className="flex items-start gap-4 max-md:flex-wrap max-md:gap-3">
                  <span className="type-data pt-1 text-sm text-muted" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div className="max-md:flex-1">
                    <p className="eyebrow">
                      {block.day} · {block.time}
                    </p>
                    <h2 className="type-title mt-2" id={`${block.id}-heading`}>
                      {block.title}
                    </h2>
                  </div>
                  <span className="ml-auto flex items-center gap-1 whitespace-nowrap rounded-full bg-pine-wash px-2 py-1 text-sm max-md:ml-8">
                    <Clock3 size={14} aria-hidden="true" />
                    {block.minutes} min
                  </span>
                </div>
                <p className="my-4 mb-6 max-w-[65ch] text-base text-muted">{block.purpose}</p>
                <ol className="mb-6 list-none p-0">
                  {block.steps.map((step) => (
                    <li
                      className="grid grid-cols-[65px_minmax(0,1fr)] gap-4 py-2 text-base max-md:grid-cols-[54px_minmax(0,1fr)] max-md:gap-3"
                      key={step.task}
                    >
                      <span className="type-data pt-0.5 text-sm text-ochre">
                        {step.minutes} min
                      </span>
                      <p>{step.task}</p>
                    </li>
                  ))}
                </ol>
                <div className="my-6 rounded-md bg-sunk px-4 py-4">
                  <span className="eyebrow">REVIEW FOR THIS SESSION</span>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {studyThemes
                      .filter((theme) => theme.sessionIds.includes(block.id))
                      .map((theme) => (
                        <Link className="link" href={`/study/themes#${theme.id}`} key={theme.id}>
                          {theme.shortTitle} <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      ))}
                  </div>
                </div>
                {block.domains.length > 0 && (
                  <div className="card overflow-hidden">
                    {block.domains.map((id) => {
                      const domain = domains.find((item) => item.id === id);
                      if (domain === undefined) {
                        throw new Error(`Unknown study domain: ${id}`);
                      }
                      return (
                        <details
                          className="group scroll-mt-6 border-t border-line first:border-t-0"
                          key={id}
                          id={`domain-${id}`}
                        >
                          <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 hover:bg-pine-wash max-md:gap-2 max-md:px-3">
                            <span className="type-data min-w-10 text-sm font-medium text-pine max-md:min-w-[26px] max-md:text-sm">
                              {domain.weight}%
                            </span>
                            <span>
                              <strong className="type-subhead block">{domain.title}</strong>
                              <small className="mt-1 block text-sm text-muted">
                                {domain.checkpoint}
                              </small>
                            </span>
                            <ChevronDown
                              size={18}
                              className="ml-auto transition-transform group-open:rotate-180"
                              aria-hidden="true"
                            />
                          </summary>
                          <div className="px-6 pb-6 text-base max-md:px-4 max-md:pb-5">
                            <h3 className="pt-3 text-sm font-semibold">
                              Decision points to rehearse
                            </h3>
                            <ul className="mt-2 list-disc pl-5">
                              {domain.essentials.map((point) => (
                                <li
                                  className="max-w-[65ch] py-1 pl-1 leading-relaxed text-ink-soft"
                                  key={point}
                                >
                                  {point}
                                </li>
                              ))}
                            </ul>
                            <div className="my-5 mb-2 space-y-2 rounded-md bg-pine-wash px-5 py-4 leading-relaxed">
                              <p className="eyebrow">SAY IT OUT LOUD · ORIGINAL PRACTICE PROMPT</p>
                              <p>{domain.prompt}</p>
                              <p>
                                <strong>Change one thing:</strong> {domain.challenge}
                              </p>
                            </div>
                            <h3 className="pt-3 text-sm font-semibold">Read to resolve a gap</h3>
                            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                              {domain.resources.map((resource) => (
                                <ExternalLink {...resource} key={resource.href} />
                              ))}
                            </div>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                )}
                {block.resources.length > 0 && (
                  <div className="pt-1">
                    <p className="eyebrow">KEEP THESE HANDY</p>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {block.resources.map((resource) => (
                        <ExternalLink key={resource.href} {...resource} />
                      ))}
                    </div>
                  </div>
                )}
                {(block.id === "sun-recap" || block.id === "mon-review") && (
                  <Link className={`link mt-5`} href="/study/recap">
                    <FileText size={16} aria-hidden="true" /> Open the one-page recap
                  </Link>
                )}
                <p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-pine">
                  <Leaf size={17} aria-hidden="true" />
                  {block.finish}
                </p>
              </section>
            ))}
          </div>
        </div>

        <section
          className="panel mt-12 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-12 scroll-mt-6 p-10 max-lg:gap-9 max-lg:grid-cols-1 max-md:mt-8 max-md:gap-6 max-md:p-5"
          id="blueprint"
          aria-labelledby="blueprint-heading"
        >
          <div>
            <p className="eyebrow">THE WHOLE PICTURE</p>
            <h2 className="type-title mt-3" id="blueprint-heading">
              Ten domains. One thoughtful clinician.
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
          <p className="eyebrow">THE ORIGINAL SOURCES</p>
          <h2 className="type-title mt-3" id="resources-heading">
            Your official resource shelf.
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
                Beyond the chapters linked above, the full manual covers sealants, SDF, nitrous
                oxide, local anesthesia, pain, periodontal care, child protection, and medication
                references, useful for a targeted gap check.
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
        <SiteFooter
          tagline="Clear thinking. Kind communication. Then a little Raleigh."
          next={{ href: "/study/themes", label: "Learn the themes" }}
        />
      </main>
    </div>
  );
}
