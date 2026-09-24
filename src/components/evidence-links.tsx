import { ArrowUpRight } from "lucide-react";

import { pdfSources, type Evidence } from "@/lib/study-themes";

/** Page-level citations that open the source PDF at the cited page. */
export function EvidenceLinks({
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
