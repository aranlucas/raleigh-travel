import { Info } from "lucide-react";

import type { DecisionMap } from "@/lib/study-themes";

import { Abbreviations } from "./abbreviations";
import { DecisionDiagram } from "./decision-map";
import { EvidenceLinks } from "./evidence-links";

export function ThemeDiagramList({ diagrams }: Readonly<{ diagrams: readonly DecisionMap[] }>) {
  return (
    <>
      <div className="mt-4">
        <Abbreviations />
      </div>
      <div className="mt-5 space-y-5">
        {diagrams.map((map) => (
          <figure className="@container rounded-lg bg-sunk p-4 md:p-6" key={map.question}>
            <figcaption className="font-display text-xl leading-snug text-pine-deep max-[799px]:sr-only">
              {map.question}
            </figcaption>
            <DecisionDiagram map={map} />
            {map.note === undefined ? null : (
              <p className="mt-4 flex items-start gap-1.5 text-sm leading-snug text-muted">
                <Info size={14} className="mt-0.5 shrink-0 text-ochre" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-ochre">Beyond the PDF:</strong> {map.note}
                </span>
              </p>
            )}
            <EvidenceLinks evidence={map.evidence} className="mt-4" />
          </figure>
        ))}
      </div>
    </>
  );
}
