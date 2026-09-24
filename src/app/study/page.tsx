import { ArrowRight, BookOpen, ChevronDown, Clock3, FileText, Leaf } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { StudyHeader } from "@/components/study-header";
import { ExternalLink } from "@/components/ui";
import { domains, officialResources, practiceBlocks, studySources } from "@/lib/study";
import { studyThemes } from "@/lib/study-themes";

const eyebrowClass =
  "flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-600";
const textLinkClass =
  "inline-flex items-center gap-2 text-sm font-medium leading-normal text-emerald-700 underline decoration-1 underline-offset-4 transition-colors hover:text-amber-700 motion-reduce:transition-none";
const solidLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-slate-900 bg-slate-900 px-4 py-3 text-base font-medium leading-normal text-white no-underline transition-colors hover:bg-emerald-800 hover:text-white motion-reduce:transition-none";

export const metadata: Metadata = {
  title: "OCE study guide · Boards & beyond",
  description:
    "A focused pediatric dental oral boards review mapped to the Raleigh study schedule, with official ABPD and AAPD resources.",
};

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 print:bg-white">
      <a
        className="fixed -top-20 left-5 z-10 bg-slate-900 px-5 py-3 text-white no-underline focus:top-3 print:hidden"
        href="#study-content"
      >
        Skip to study guide
      </a>
      <StudyHeader />
      <main
        className="mx-auto max-w-[1360px] px-11 max-[1190px]:px-8 max-[760px]:px-5"
        id="study-content"
      >
        <section className="grid grid-cols-[minmax(0,1fr)_330px] items-center gap-20 pt-16 pb-13 max-[1100px]:grid-cols-[minmax(0,1fr)_280px] max-[1100px]:gap-9 max-[760px]:grid-cols-1 max-[760px]:gap-7 max-[760px]:pt-8 max-[760px]:pb-8">
          <div>
            <p className={eyebrowClass}>
              <BookOpen size={16} aria-hidden="true" /> YOUR OCE FIELD NOTES
            </p>
            <h1 className="mt-4 mb-6 font-sans text-6xl font-medium leading-tight tracking-tight max-[420px]:text-5xl">
              Practice with a plan.
              <br />
              <em className="font-normal text-emerald-700">Then take a breath.</em>
            </h1>
            <p className="max-w-[600px] text-lg leading-relaxed text-slate-600 max-[760px]:text-base">
              A focused crash course for pediatric dental oral boards. Review the decision points,
              say your reasoning out loud, and use the original sources to close the gaps.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 max-[420px]:gap-4">
              <Link className={solidLinkClass} href="/study/themes">
                Learn the themes <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a className={textLinkClass} href="#sat-cases">
                Your practice plan
              </a>
              <Link className={textLinkClass} href="/study/recap">
                <FileText size={16} aria-hidden="true" /> One-page recap
              </Link>
            </div>
          </div>
          <aside className="rounded-lg bg-emerald-50 p-7 max-[760px]:p-6">
            <Leaf
              className="text-emerald-700 max-[760px]:hidden"
              size={25}
              strokeWidth={1.4}
              aria-hidden="true"
            />
            <h2 className="mt-3 font-sans text-2xl font-semibold leading-snug tracking-tight max-[760px]:text-3xl">
              Enough structure.
              <br className="max-[760px]:hidden" /> Room to breathe.
            </h2>
            <dl className="mt-6 mb-4">
              <div className="flex justify-between gap-2 border-t border-slate-200 py-2 text-sm">
                <dt className="text-slate-600">Focused preparation</dt>
                <dd className="m-0 font-semibold">6½ hours</dd>
              </div>
              <div className="flex justify-between gap-2 border-t border-slate-200 py-2 text-sm">
                <dt className="text-slate-600">Blueprint domains</dt>
                <dd className="m-0 font-semibold">All 10</dd>
              </div>
              <div className="flex justify-between gap-2 border-t border-slate-200 py-2 text-sm">
                <dt className="text-slate-600">Monday stopping point</dt>
                <dd className="m-0 font-semibold">9:45 AM</dd>
              </div>
            </dl>
            <p className="text-sm text-slate-600">
              Choose the readings for your weak areas. This weekend is for consolidation, not
              reading the entire manual.
            </p>
          </aside>
        </section>

        <section
          className="grid grid-cols-[280px_minmax(0,1fr)] gap-10 border-y border-slate-200 py-7 max-[1100px]:grid-cols-[245px_minmax(0,1fr)] max-[1100px]:gap-6 max-[760px]:grid-cols-1 max-[760px]:gap-4"
          aria-labelledby="answer-heading"
        >
          <div>
            <p className={eyebrowClass}>BEFORE EVERY CASE</p>
            <h2
              className="mt-2 font-sans text-2xl font-semibold leading-snug tracking-tight"
              id="answer-heading"
            >
              Answer what was asked.
            </h2>
          </div>
          <div>
            <p className="text-base text-emerald-700">
              Pause, clarify if needed, then give a direct answer with a reason. When a full plan is
              requested, try:{" "}
              <strong>findings → diagnosis → options → recommendation → follow-up.</strong> Use only
              the parts relevant to the question.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              An original rehearsal aid informed by ABPD’s communication guidance. Examiners assess
              clinical reasoning, communication, and professionalism; their 1–3 ratings distinguish
              inaccurate, incomplete, and fully demonstrated performance. This page does not predict
              a score.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <ExternalLink label="Communication guidance" href={studySources.communication} />
              <ExternalLink label="Official scoring rubric" href={studySources.blueprint} />
            </div>
          </div>
        </section>

        <div className="mt-10 grid grid-cols-[245px_minmax(0,1fr)] items-start gap-19 max-[1100px]:grid-cols-[190px_minmax(0,1fr)] max-[1100px]:gap-9 max-[760px]:mt-7 max-[760px]:block">
          <aside className="sticky top-5 max-[760px]:static max-[760px]:mb-7">
            <nav
              className="flex flex-col max-[760px]:grid max-[760px]:grid-cols-2 max-[760px]:gap-x-2 max-[760px]:gap-y-1"
              aria-label="Practice blocks"
            >
              <p className={`${eyebrowClass} mb-4 max-[760px]:col-span-full max-[760px]:mb-2`}>
                YOUR PRACTICE BLOCKS
              </p>
              {practiceBlocks.map((block) => (
                <a
                  className="flex flex-col border-l-2 border-slate-200 px-4 py-3 no-underline hover:border-emerald-300 hover:bg-emerald-50 max-[1100px]:pl-2 max-[760px]:px-3 max-[760px]:py-2"
                  key={block.id}
                  href={`#${block.id}`}
                >
                  <span className="text-sm text-slate-600">{block.day}</span>
                  <strong className="text-sm font-medium">{block.time}</strong>
                  <small className="mt-0 text-sm text-slate-600 max-[760px]:hidden">
                    {block.title}
                  </small>
                </a>
              ))}
              <a
                className="flex flex-col border-l-2 border-slate-200 px-4 py-3 no-underline hover:border-emerald-300 hover:bg-emerald-50 max-[1100px]:pl-2 max-[760px]:px-3 max-[760px]:py-2"
                href="#blueprint"
              >
                <strong className="text-sm font-medium">Blueprint at a glance</strong>
              </a>
              <a
                className="flex flex-col border-l-2 border-slate-200 px-4 py-3 no-underline hover:border-emerald-300 hover:bg-emerald-50 max-[1100px]:pl-2 max-[760px]:px-3 max-[760px]:py-2"
                href="#official-resources"
              >
                <strong className="text-sm font-medium">Official resource library</strong>
              </a>
              <Link
                className="flex flex-col border-l-2 border-slate-200 px-4 py-3 no-underline hover:border-emerald-300 hover:bg-emerald-50 max-[1100px]:pl-2 max-[760px]:px-3 max-[760px]:py-2"
                href="/study/recap"
              >
                <strong className="text-sm font-medium">Print your recap sheet ↗</strong>
              </Link>
              <Link
                className="flex flex-col border-l-2 border-slate-200 px-4 py-3 no-underline hover:border-emerald-300 hover:bg-emerald-50 max-[1100px]:pl-2 max-[760px]:px-3 max-[760px]:py-2"
                href="/study/themes"
              >
                <strong className="text-sm font-medium">Theme notes & decision maps ↗</strong>
              </Link>
            </nav>
          </aside>
          <div className="min-w-0">
            <p className="border-b border-slate-200 pb-5 text-sm leading-relaxed text-slate-600">
              Independent study aid, reviewed September 23, 2026. The prompts below are original
              practice cases, not ABPD exam questions. Clinical notes are brief review cues; use the
              full current guidelines and your training for treatment decisions.
            </p>
            {practiceBlocks.map((block, index) => (
              <section
                className="scroll-mt-6 border-b border-slate-200 py-9"
                id={block.id}
                key={block.id}
                aria-labelledby={`${block.id}-heading`}
              >
                <div className="flex items-start gap-4 max-[760px]:flex-wrap max-[760px]:gap-3">
                  <span
                    className="font-sans text-lg font-semibold leading-normal text-slate-600"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <div className="max-[760px]:flex-1">
                    <p className={eyebrowClass}>
                      {block.day} · {block.time}
                    </p>
                    <h2
                      className="mt-2 font-sans text-3xl font-semibold leading-snug tracking-tight max-[760px]:text-2xl"
                      id={`${block.id}-heading`}
                    >
                      {block.title}
                    </h2>
                  </div>
                  <span className="ml-auto flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-50 px-2 py-1 text-sm max-[760px]:ml-8">
                    <Clock3 size={14} aria-hidden="true" />
                    {block.minutes} min
                  </span>
                </div>
                <p className="my-4 mb-6 max-w-[65ch] text-base text-slate-600">{block.purpose}</p>
                <ol className="mb-6 list-none p-0">
                  {block.steps.map((step) => (
                    <li
                      className="grid grid-cols-[65px_minmax(0,1fr)] gap-4 py-2 text-base max-[760px]:grid-cols-[54px_minmax(0,1fr)] max-[760px]:gap-3"
                      key={step.task}
                    >
                      <span className="pt-0 text-sm font-medium text-amber-800">
                        {step.minutes} min
                      </span>
                      <p>{step.task}</p>
                    </li>
                  ))}
                </ol>
                <div className="my-6 rounded-md bg-emerald-50 px-4 py-4">
                  <span className={eyebrowClass}>REVIEW FOR THIS SESSION</span>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {studyThemes
                      .filter((theme) => theme.sessionIds.includes(block.id))
                      .map((theme) => (
                        <Link
                          className={textLinkClass}
                          href={`/study/themes#${theme.id}`}
                          key={theme.id}
                        >
                          {theme.shortTitle} <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      ))}
                  </div>
                </div>
                {block.domains.length > 0 && (
                  <div className="overflow-hidden rounded-lg border border-slate-200">
                    {block.domains.map((id) => {
                      const domain = domains.find((item) => item.id === id);
                      if (domain === undefined) {
                        throw new Error(`Unknown study domain: ${id}`);
                      }
                      return (
                        <details
                          className="group scroll-mt-6 border-t border-slate-200 first:border-t-0"
                          key={id}
                          id={`domain-${id}`}
                        >
                          <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 hover:bg-emerald-50 max-[760px]:gap-2 max-[760px]:px-3">
                            <span className="min-w-8 text-base font-semibold text-emerald-700 max-[760px]:min-w-[26px] max-[760px]:text-sm">
                              {domain.weight}%
                            </span>
                            <span>
                              <strong className="block font-sans text-xl font-semibold leading-normal">
                                {domain.title}
                              </strong>
                              <small className="mt-1 block text-sm text-slate-600">
                                {domain.checkpoint}
                              </small>
                            </span>
                            <ChevronDown
                              size={18}
                              className="ml-auto transition-transform group-open:rotate-180"
                              aria-hidden="true"
                            />
                          </summary>
                          <div className="px-6 pb-6 text-base max-[760px]:px-4 max-[760px]:pb-5">
                            <h3 className="pt-3 font-sans text-sm font-semibold">
                              Decision points to rehearse
                            </h3>
                            <ul className="mt-2 list-disc pl-5">
                              {domain.essentials.map((point) => (
                                <li
                                  className="max-w-[65ch] py-1 pl-1 leading-relaxed text-slate-800"
                                  key={point}
                                >
                                  {point}
                                </li>
                              ))}
                            </ul>
                            <div className="my-5 mb-2 space-y-2 rounded-md bg-emerald-50 px-5 py-4 leading-relaxed">
                              <p className={eyebrowClass}>
                                SAY IT OUT LOUD · ORIGINAL PRACTICE PROMPT
                              </p>
                              <p>{domain.prompt}</p>
                              <p>
                                <strong>Change one thing:</strong> {domain.challenge}
                              </p>
                            </div>
                            <h3 className="pt-3 font-sans text-sm font-semibold">
                              Read to resolve a gap
                            </h3>
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
                    <p className={eyebrowClass}>KEEP THESE HANDY</p>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {block.resources.map((resource) => (
                        <ExternalLink key={resource.href} {...resource} />
                      ))}
                    </div>
                  </div>
                )}
                {(block.id === "sun-recap" || block.id === "mon-review") && (
                  <Link className={`${textLinkClass} mt-5`} href="/study/recap">
                    <FileText size={16} aria-hidden="true" /> Open the one-page recap
                  </Link>
                )}
                <p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-emerald-700">
                  <Leaf size={17} aria-hidden="true" />
                  {block.finish}
                </p>
              </section>
            ))}
          </div>
        </div>

        <section
          className="mt-12 grid grid-cols-2 gap-21 scroll-mt-6 rounded-lg bg-emerald-50 p-10 max-[1100px]:gap-9 max-[760px]:mt-8 max-[760px]:grid-cols-1 max-[760px]:gap-6 max-[760px]:p-6"
          id="blueprint"
          aria-labelledby="blueprint-heading"
        >
          <div>
            <p className={eyebrowClass}>THE WHOLE PICTURE</p>
            <h2
              className="mt-3 font-sans text-3xl font-semibold leading-snug tracking-tight"
              id="blueprint-heading"
            >
              Ten domains. One thoughtful clinician.
            </h2>
            <p className="my-4 text-base text-emerald-700">
              The percentages below are ABPD’s published blueprint weights. They describe exam
              coverage, not the number of minutes to spend studying. Labels are shortened here; open
              the original for every task statement.
            </p>
            <ExternalLink label="Complete ABPD blueprint" href={studySources.blueprint} />
          </div>
          <div>
            {domains.map((domain) => (
              <a
                className="group block py-2 no-underline"
                href={`#domain-${domain.id}`}
                key={domain.id}
              >
                <span className="flex justify-between gap-4 text-sm">
                  {domain.title}
                  <strong className="font-medium">{domain.weight}%</strong>
                </span>
                <span className="mt-1 block h-[3px] bg-emerald-100" aria-hidden="true">
                  <span
                    className="block h-full bg-emerald-600 group-hover:bg-amber-700"
                    style={{ width: `${(domain.weight / 17) * 100}%` }}
                  />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section
          className="scroll-mt-6 pt-13"
          id="official-resources"
          aria-labelledby="resources-heading"
        >
          <p className={eyebrowClass}>THE ORIGINAL SOURCES</p>
          <h2
            className="mt-3 font-sans text-3xl font-semibold leading-snug tracking-tight"
            id="resources-heading"
          >
            Your official resource shelf.
          </h2>
          <p className="mt-4 max-w-[780px] text-base text-slate-600">
            The public candidate preparation resources linked from ABPD’s OCE pages, together in one
            place. Full documents and videos open at their original hosts; they are not copied into
            this app.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-x-8 max-[760px]:grid-cols-2 max-[760px]:gap-x-6 max-[420px]:grid-cols-1">
            {officialResources.map((resource) => (
              <article className="border-t border-slate-200 py-5" key={resource.href}>
                <ExternalLink {...resource} />
                <p className="mt-2 text-sm text-slate-600">{resource.note}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 flex items-start gap-6 rounded-lg bg-amber-50 p-7 max-[760px]:gap-4 max-[760px]:p-6">
            <BookOpen
              className="max-[760px]:hidden"
              size={26}
              strokeWidth={1.4}
              aria-hidden="true"
            />
            <div>
              <h3 className="font-sans text-2xl font-semibold leading-snug tracking-tight">
                AAPD Reference Manual · 2026–2027
              </h3>
              <p className="mt-3 text-base text-slate-600">
                ABPD recommends the AAPD policies and clinical guidance, recent research, and
                textbooks; it does not provide a closed list of required books or articles on its
                study-tips page. The selected chapter links above match your sessions. The complete
                manual also includes sealants, SDF, nitrous oxide, local anesthesia, pain,
                periodontal care, child protection, medication references, and other topics for a
                targeted gap check.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                AAPD currently labels the 2026–2027 collection “Official But Unformatted.” Check
                each document’s revision date and distinguish a newly revised chapter from older
                guidance carried into the current edition.
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
        <footer className="mt-15 flex items-center justify-between gap-6 border-t border-slate-200 py-7 pb-8 text-sm text-slate-600 max-[760px]:mt-10 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-3 max-[760px]:py-6">
          <span className="flex items-center gap-2 font-sans text-lg font-medium leading-normal">
            Clear thinking. Kind communication. Then a little Raleigh.
          </span>
          <Link className={textLinkClass} href="/">
            Back to your itinerary <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </footer>
      </main>
    </div>
  );
}
