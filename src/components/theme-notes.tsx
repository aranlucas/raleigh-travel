import { ArrowUpRight, BookOpen, ChevronDown } from "lucide-react";
import Link from "next/link";

import { practiceBlocks } from "@/lib/study";
import { pdfSources, type Evidence, type StudyTheme } from "@/lib/study-themes";
import { themeDiagrams } from "@/lib/theme-diagrams";

import { DecisionDiagram } from "./decision-map";
import { StepChain } from "./step-chain";

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
            className="break-words text-sm leading-normal text-muted underline decoration-pine/40 underline-offset-2"
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
  const diagrams = themeDiagrams[theme.id] ?? [];
  return (
    <section
      id={theme.id}
      data-theme={theme.id}
      className="scroll-mt-6 border-b border-line py-8 md:py-11"
      aria-labelledby={`${theme.id}-title`}
    >
      <header className="flex items-start gap-3 md:gap-5">
        <span className="type-data min-w-6 pt-1.5 text-sm text-muted" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="eyebrow">
            {sources.length} {sources.length === 1 ? "SOURCE PDF" : "PDFs COMBINED"}
          </p>
          <h2 id={`${theme.id}-title`} className="type-title mt-2">
            {theme.title}
          </h2>
        </div>
      </header>
      <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-ink-soft">{theme.summary}</p>
      <div
        className="panel my-6 flex flex-col items-start gap-2 px-4 py-4 md:flex-row md:flex-wrap md:items-baseline md:gap-x-5 md:gap-y-2 md:px-6"
        data-memory-cue="true"
      >
        <span className="eyebrow">Remember</span>
        <StepChain text={theme.memoryCue} className="flex-1" />
      </div>
      <div data-key-points="true">
        <h3 className="type-subhead">The key points</h3>
        <ul className="mt-3 grid list-disc grid-cols-1 gap-x-10 gap-y-5 pl-5 lg:grid-cols-2">
          {theme.points.map((point) => (
            <li className="pl-1" key={point.text}>
              <p className="text-base leading-relaxed text-ink-soft">{point.text}</p>
              <EvidenceLinks evidence={point.evidence} />
            </li>
          ))}
        </ul>
      </div>
      {diagrams.length > 0 && (
        <div className="mt-8" data-diagrams={theme.id}>
          <h3 className="type-subhead">Picture the decision</h3>
          <div className="mt-3 space-y-4">
            {diagrams.map((map) => (
              <figure
                className="@container rounded-lg bg-sunk p-4 md:p-6"
                data-diagram={theme.id}
                key={map.question}
              >
                <DecisionDiagram map={map} />
                <EvidenceLinks evidence={map.evidence} className="mt-4" />
              </figure>
            ))}
          </div>
        </div>
      )}
      <div className="mt-8" data-recall-section="true">
        <div className="mb-3 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h3 className="type-subhead">The decisions to explain</h3>
          <p className="text-sm text-muted">Answer out loud, then open to check.</p>
        </div>
        {theme.decisions.map((decision, decisionIndex) => (
          <details
            className="group border-t border-line last:border-b"
            key={decision.question}
            data-recall={decisionIndex + 1}
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-1 py-4 text-ink hover:text-pine [&::-webkit-details-marker]:hidden">
              <span className="type-data min-w-5 text-sm text-muted">{decisionIndex + 1}</span>
              <strong className="text-base font-semibold leading-normal">
                {decision.question}
              </strong>
              <ChevronDown
                size={17}
                aria-hidden="true"
                className="ml-auto text-muted transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="max-w-[70ch] px-8 pb-5 text-base leading-relaxed text-ink-soft max-md:pr-1">
              <p>{decision.answer}</p>
              <EvidenceLinks evidence={decision.evidence} />
            </div>
          </details>
        ))}
      </div>
      <aside className="callout mt-6 px-5 py-4 text-ink-soft" data-pitfall="true">
        <strong className="text-sm text-ochre">Don’t miss this</strong>
        <p className="mt-1 max-w-[65ch] text-base leading-relaxed text-ink-soft">
          {theme.pitfall.text}
        </p>
        <EvidenceLinks evidence={theme.pitfall.evidence} />
      </aside>
      <div className="mt-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-start gap-2">
          <span className="eyebrow">IN YOUR PRACTICE PLAN</span>
          {sessions.map((block) => (
            <Link className="link" href={`/study#${block.id}`} key={block.id}>
              {block.day} · {block.time}
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm text-ink-soft [&::-webkit-details-marker]:hidden">
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
                <span className="mt-1 block text-sm text-muted">
                  {source.revision} · {source.pageCount} PDF pages
                </span>
                {source.note !== undefined && (
                  <p className="mt-1 block text-sm text-muted">{source.note}</p>
                )}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
