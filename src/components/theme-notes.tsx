import { ArrowDown, ArrowUpRight, BookOpen, ChevronDown } from "lucide-react";
import Link from "next/link";

import { practiceBlocks } from "@/lib/study";
import { pdfSources, type Evidence, type StudyTheme } from "@/lib/study-themes";

function EvidenceLinks({
  evidence,
  className = "mt-2",
}: Readonly<{ evidence: readonly Evidence[]; className?: string }>) {
  return (
    <span className={`flex flex-wrap gap-x-4 gap-y-1 ${className}`}>
      {evidence.map((citation) => {
        const source = pdfSources.find((item) => item.id === citation.source);
        if (source === undefined) {
          throw new Error(`Unknown PDF source: ${citation.source}`);
        }
        const firstPage = citation.pages.match(/\d+/u)?.[0];
        const href = firstPage === undefined ? source.href : `${source.href}#page=${firstPage}`;
        return (
          <a
            key={`${citation.source}-${citation.pages}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={`${source.title} · PDF pages ${citation.pages}`}
            className="break-words text-sm leading-normal text-slate-600 underline decoration-emerald-300 underline-offset-2"
          >
            {source.citationLabel} ·{" "}
            {citation.pages.includes("–") || citation.pages.includes(",") ? "pp." : "p."}{" "}
            {citation.pages}
            <ArrowUpRight size={11} aria-hidden="true" className="ml-1 inline align-middle" />
            <span className="sr-only"> (PDF opens in a new tab)</span>
          </a>
        );
      })}
    </span>
  );
}

export function ThemeNotes({ theme, index }: Readonly<{ theme: StudyTheme; index: number }>) {
  const sources = theme.sourceIds.map((id) => {
    const source = pdfSources.find((item) => item.id === id);
    if (source === undefined) {
      throw new Error(`Unknown theme source: ${id}`);
    }
    return source;
  });
  const sessions = practiceBlocks.filter((block) => theme.sessionIds.includes(block.id));
  return (
    <section
      id={theme.id}
      data-theme={theme.id}
      className="scroll-mt-6 border-b border-slate-200 py-8 md:py-11"
      aria-labelledby={`${theme.id}-title`}
    >
      <header className="flex items-start gap-3 md:gap-5">
        <span
          className="min-w-6 pt-0 text-lg font-semibold leading-normal text-slate-500"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
            {sources.length} {sources.length === 1 ? "SOURCE PDF" : "PDFs COMBINED"}
          </p>
          <h2
            id={`${theme.id}-title`}
            className="mt-2 font-sans text-2xl font-semibold leading-normal tracking-tight md:text-3xl"
          >
            {theme.title}
          </h2>
        </div>
      </header>
      <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-slate-800">{theme.summary}</p>
      <div
        className="my-6 flex flex-col items-start gap-2 rounded-md bg-emerald-50 px-4 py-4 md:flex-row md:flex-wrap md:items-baseline md:gap-x-5 md:gap-y-2 md:px-6"
        data-memory-cue="true"
      >
        <span className="text-sm font-semibold uppercase tracking-wide text-slate-600">
          Remember
        </span>
        <strong className="flex-1 font-sans text-lg font-semibold leading-normal md:text-xl">
          {theme.memoryCue}
        </strong>
        <small className="text-sm text-slate-600">Original study cue</small>
      </div>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-10">
        <div
          className={theme.diagram ? "min-w-0" : "min-w-0 lg:col-span-full lg:max-w-[870px]"}
          data-key-points="true"
        >
          <h3 className="font-sans text-lg font-semibold leading-normal">The key points</h3>
          <ul className="mt-3 list-disc pl-5">
            {theme.points.map((point) => (
              <li className="pb-6 pl-1 last:pb-0" key={point.text}>
                <p className="text-base leading-relaxed text-slate-800">{point.text}</p>
                <EvidenceLinks evidence={point.evidence} />
              </li>
            ))}
          </ul>
        </div>
        {theme.diagram && (
          <figure
            className="rounded-md border border-slate-200 bg-slate-100 p-4 md:p-5"
            data-diagram={theme.id}
          >
            <figcaption className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
              Picture the decision
            </figcaption>
            <div className="rounded-md border border-emerald-300 bg-white px-4 py-3 text-center text-base font-semibold">
              {theme.diagram.question}
            </div>
            <ArrowDown size={20} aria-hidden="true" className="mx-auto my-2 block text-slate-600" />
            <ul className="grid grid-cols-1 list-none gap-2 p-0 md:grid-cols-2">
              {theme.diagram.branches.map((branch, branchIndex) => (
                <li
                  key={branch.when}
                  className={`border-t-[3px] border-emerald-300 bg-white p-3 ${
                    theme.diagram &&
                    theme.diagram.branches.length % 2 === 1 &&
                    branchIndex === theme.diagram.branches.length - 1
                      ? "md:col-span-full"
                      : ""
                  }`}
                  data-branch={branch.when}
                >
                  <strong className="block text-base text-slate-900">{branch.when}</strong>
                  <span className="mt-2 block text-base leading-relaxed text-slate-700">
                    {branch.action}
                  </span>
                </li>
              ))}
            </ul>
            <EvidenceLinks evidence={theme.diagram.evidence} className="mt-4" />
          </figure>
        )}
      </div>
      <div className="mt-6 md:mt-4" data-recall-section="true">
        <div className="mb-3 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h3 className="font-sans text-lg font-semibold leading-normal">
            The decisions to explain
          </h3>
          <p className="text-sm text-slate-600">Answer out loud, then open to check.</p>
        </div>
        {theme.decisions.map((decision, decisionIndex) => (
          <details
            className="group border-t border-slate-200 last:border-b"
            key={decision.question}
            data-recall={decisionIndex + 1}
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-1 py-4 text-slate-900 hover:text-emerald-700 [&::-webkit-details-marker]:hidden">
              <span className="w-[15px] min-w-5 text-sm font-semibold leading-normal text-slate-500">
                {decisionIndex + 1}
              </span>
              <strong className="text-base font-semibold leading-normal">
                {decision.question}
              </strong>
              <ChevronDown
                size={17}
                aria-hidden="true"
                className="ml-auto text-slate-600 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="max-w-[70ch] px-8 pb-5 text-base leading-relaxed text-slate-800 max-md:pr-1">
              <p>{decision.answer}</p>
              <EvidenceLinks evidence={decision.evidence} />
            </div>
          </details>
        ))}
      </div>
      <aside
        className="mt-6 border-l-[3px] border-amber-300 bg-amber-50 px-5 py-4 text-slate-800"
        data-pitfall="true"
      >
        <strong className="text-sm text-amber-800">Don’t miss this</strong>
        <p className="mt-1 max-w-[65ch] text-base leading-relaxed text-slate-800">
          {theme.pitfall.text}
        </p>
        <EvidenceLinks evidence={theme.pitfall.evidence} />
      </aside>
      <div className="mt-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-start gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-600">
            IN YOUR PRACTICE PLAN
          </span>
          {sessions.map((block) => (
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium leading-normal text-emerald-700 underline decoration-1 underline-offset-4 transition-colors hover:text-amber-700"
              href={`/study#${block.id}`}
              key={block.id}
            >
              {block.day} · {block.time}
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm text-slate-800 [&::-webkit-details-marker]:hidden">
            <BookOpen size={16} aria-hidden="true" />
            Sources combined ({sources.length})
            <ChevronDown
              size={15}
              aria-hidden="true"
              className="transition-transform group-open:rotate-180"
            />
          </summary>
          <ul className="mt-4 list-none p-0 pl-6">
            {sources.map((source, sourceIndex) => (
              <li className={sourceIndex > 0 ? "mt-3" : ""} key={source.id}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm underline underline-offset-3"
                >
                  {source.title}
                  <ArrowUpRight size={12} aria-hidden="true" />
                  <span className="sr-only"> (PDF opens in a new tab)</span>
                </a>
                <span className="mt-1 block text-sm text-slate-600">
                  {source.revision} · {source.pageCount} PDF pages
                </span>
                {source.note !== undefined && (
                  <p className="mt-1 block text-sm text-slate-600">{source.note}</p>
                )}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
