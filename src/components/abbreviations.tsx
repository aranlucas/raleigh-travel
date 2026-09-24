import { ChevronDown } from "lucide-react";

const terms = [
  ["F", "fluoride"],
  ["SDF", "silver diamine fluoride"],
  ["ITR", "interim therapeutic restoration"],
  ["SSC", "stainless steel crown"],
  ["IPT", "indirect pulp treatment"],
  ["VPT", "vital pulp therapy"],
  ["CS", "calcium silicate"],
  ["LSTR", "lesion sterilization and tissue repair"],
  ["RMGIC", "resin-modified glass ionomer cement"],
  ["PMC", "preformed metal crown"],
  ["GA", "general anesthesia"],
  ["NaOCl", "sodium hypochlorite"],
  ["PA", "periapical"],
  ["CHD", "congenital heart disease"],
  ["NSAID", "nonsteroidal anti-inflammatory drug"],
  ["VA shunt", "ventriculoatrial shunt"],
] as const;

export function Abbreviations() {
  return (
    <details className="group">
      <summary className="flex items-center gap-2 text-sm font-semibold text-pine-deep">
        Abbreviations used in the maps
        <ChevronDown
          size={16}
          className="transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm text-ink-soft sm:grid-cols-2 lg:grid-cols-3">
        {terms.map(([term, meaning]) => (
          <div className="flex gap-2" key={term}>
            <dt className="min-w-16 font-semibold text-ink">{term}</dt>
            <dd>{meaning}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
