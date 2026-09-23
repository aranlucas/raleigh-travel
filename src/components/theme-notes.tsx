import { ArrowDown, ArrowUpRight, BookOpen, ChevronDown } from "lucide-react";
import Link from "next/link";

import { practiceBlocks } from "@/lib/study";
import { pdfSources, type Evidence, type StudyTheme } from "@/lib/study-themes";

function EvidenceLinks({ evidence }: Readonly<{ evidence: readonly Evidence[] }>) {
  return (
    <span className="evidence-links">
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
          >
            {source.citationLabel} ·{" "}
            {citation.pages.includes("–") || citation.pages.includes(",") ? "pp." : "p."}{" "}
            {citation.pages}
            <ArrowUpRight size={11} aria-hidden="true" />
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
    <section id={theme.id} className="theme-notes" aria-labelledby={`${theme.id}-title`}>
      <header className="theme-notes-heading">
        <span className="theme-number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="eyebrow">
            {sources.length} {sources.length === 1 ? "SOURCE PDF" : "PDFs COMBINED"}
          </p>
          <h2 id={`${theme.id}-title`}>{theme.title}</h2>
        </div>
      </header>
      <p className="theme-summary">{theme.summary}</p>
      <div className="memory-cue">
        <span>Remember</span>
        <strong>{theme.memoryCue}</strong>
        <small>Original study cue</small>
      </div>
      <div className="theme-teaching">
        <div className="theme-key-points">
          <h3>The key points</h3>
          <ul>
            {theme.points.map((point) => (
              <li key={point.text}>
                <p>{point.text}</p>
                <EvidenceLinks evidence={point.evidence} />
              </li>
            ))}
          </ul>
        </div>
        {theme.diagram && (
          <figure className="decision-map">
            <figcaption>Picture the decision</figcaption>
            <div className="decision-map-question">{theme.diagram.question}</div>
            <ArrowDown size={20} aria-hidden="true" className="decision-map-arrow" />
            <ul className="decision-map-branches">
              {theme.diagram.branches.map((branch) => (
                <li key={branch.when}>
                  <strong>{branch.when}</strong>
                  <span>{branch.action}</span>
                </li>
              ))}
            </ul>
            <EvidenceLinks evidence={theme.diagram.evidence} />
          </figure>
        )}
      </div>
      <div className="theme-decisions">
        <div className="theme-decisions-heading">
          <h3>The decisions to explain</h3>
          <p>Answer out loud, then open to check.</p>
        </div>
        {theme.decisions.map((decision, decisionIndex) => (
          <details className="recall-decision" key={decision.question}>
            <summary>
              <span>{decisionIndex + 1}</span>
              <strong>{decision.question}</strong>
              <ChevronDown size={17} aria-hidden="true" />
            </summary>
            <div className="recall-answer">
              <p>{decision.answer}</p>
              <EvidenceLinks evidence={decision.evidence} />
            </div>
          </details>
        ))}
      </div>
      <aside className="theme-pitfall">
        <strong>Don’t miss this</strong>
        <p>{theme.pitfall.text}</p>
        <EvidenceLinks evidence={theme.pitfall.evidence} />
      </aside>
      <div className="theme-bottom-row">
        <div className="theme-session-links">
          <span className="eyebrow">IN YOUR PRACTICE PLAN</span>
          {sessions.map((block) => (
            <Link className="text-link" href={`/study#${block.id}`} key={block.id}>
              {block.day} · {block.time}
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <details className="theme-sources">
          <summary>
            <BookOpen size={16} aria-hidden="true" />
            Sources combined ({sources.length})<ChevronDown size={15} aria-hidden="true" />
          </summary>
          <ul>
            {sources.map((source) => (
              <li key={source.id}>
                <a href={source.href} target="_blank" rel="noopener noreferrer">
                  {source.title}
                  <ArrowUpRight size={12} aria-hidden="true" />
                  <span className="sr-only"> (PDF opens in a new tab)</span>
                </a>
                <span>
                  {source.revision} · {source.pageCount} PDF pages
                </span>
                {source.note !== undefined && <p>{source.note}</p>}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
