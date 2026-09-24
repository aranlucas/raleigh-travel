import { domains, practiceBlocks } from "@/lib/study";

export function CoverageGrid() {
  const sessions = practiceBlocks.filter((block) => block.domains.length > 0);
  const consolidation = practiceBlocks.filter((block) => block.domains.length === 0);
  const maxWeight = Math.max(...domains.map((domain) => domain.weight));
  return (
    <div className="min-w-0">
      <div className="card overflow-x-auto">
        <table className="w-full border-collapse text-[0.8125rem] sm:text-sm">
          <caption className="sr-only">
            Which practice session covers each blueprint domain, with blueprint weights
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="eyebrow px-3 py-3 text-left font-medium sm:px-4">
                Domain
              </th>
              {sessions.map((block) => (
                <th
                  scope="col"
                  key={block.id}
                  className="w-11 px-0.5 py-3 text-center font-normal sm:w-20"
                >
                  <a
                    className="group no-underline"
                    href={`#${block.id}`}
                    aria-label={`${block.day} ${block.time}`}
                  >
                    <span className="eyebrow block group-hover:text-ink">
                      {block.day.slice(0, 3)}
                    </span>
                    <span className="type-data block text-[0.6875rem] text-ink-soft group-hover:text-ink sm:text-xs">
                      {block.time.split("–")[0].replace(/\s?[AP]M/u, "")}
                    </span>
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {domains.map((domain) => (
              <tr className="border-b border-line last:border-b-0" key={domain.id}>
                <th scope="row" className="px-3 py-2.5 text-left font-normal sm:px-4">
                  <a
                    className="group block no-underline"
                    href={`#domain-${domain.id}`}
                    aria-label={`${domain.title}, ${domain.weight}% of the blueprint`}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="group-hover:text-pine">{domain.title}</span>
                      <span className="type-data text-xs text-muted">{domain.weight}%</span>
                    </span>
                    <span className="mt-1.5 block h-[3px] rounded-full bg-sunk" aria-hidden="true">
                      <span
                        className="block h-full rounded-full bg-pine/60 group-hover:bg-pine"
                        style={{ width: `${(domain.weight / maxWeight) * 100}%` }}
                      />
                    </span>
                  </a>
                </th>
                {sessions.map((block) => {
                  const covered = block.domains.includes(domain.id);
                  return (
                    <td className="text-center" key={block.id}>
                      <span
                        className={`inline-block rounded-full ${covered ? "size-3.5 bg-pine ring-4 ring-pine-wash" : "size-1.5 bg-line"}`}
                      />
                      <span className="sr-only">{covered ? "Covered" : "Not covered"}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-line-strong bg-sunk/60">
              <th scope="row" className="eyebrow px-3 py-3 text-left font-medium sm:px-4">
                Blueprint covered
              </th>
              {sessions.map((block) => (
                <td className="type-data py-3 text-center text-sm font-medium" key={block.id}>
                  {domains
                    .filter((domain) => block.domains.includes(domain.id))
                    .reduce((total, domain) => total + domain.weight, 0)}
                  %
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted">
        {consolidation.length} more blocks review familiar material without adding domains:{" "}
        {consolidation.map((block, index) => (
          <span key={block.id}>
            {index > 0 ? " · " : ""}
            <a className="link-quiet" href={`#${block.id}`}>
              {block.title}
            </a>
          </span>
        ))}
      </p>
    </div>
  );
}
