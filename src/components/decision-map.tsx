import { ArrowDown } from "lucide-react";
import { Fragment } from "react";

import type { DecisionBranch, DecisionMap } from "@/lib/study-themes";

function BranchCard({
  branch,
  compact = false,
}: Readonly<{ branch: Pick<DecisionBranch, "when" | "action">; compact?: boolean }>) {
  return (
    <div
      className="h-full rounded-md border-t-[3px] border-pine/40 bg-surface p-3"
      data-branch={branch.when}
    >
      <strong className={`block text-ink ${compact ? "text-sm" : "text-base"}`}>
        {branch.when}
      </strong>
      <span
        className={`mt-1.5 block leading-relaxed text-ink-soft ${compact ? "text-sm" : "text-base"}`}
      >
        {branch.action}
      </span>
    </div>
  );
}

function Matrix({ map }: Readonly<{ map: DecisionMap }>) {
  const axes = map.axes;
  if (axes === undefined) {
    return null;
  }
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `auto repeat(${axes.columns.length}, minmax(0, 1fr))` }}
    >
      <span />
      {axes.columns.map((column) => (
        <span className="eyebrow justify-center pb-1 text-center" key={column}>
          {column}
        </span>
      ))}
      {axes.rows.map((row, rowIndex) => (
        <Fragment key={row}>
          <span className="eyebrow rotate-180 justify-center self-stretch px-1 text-center [writing-mode:vertical-rl]">
            {row}
          </span>
          {axes.columns.map((column, columnIndex) => {
            const branch = map.branches.find(
              (item) => item.cell?.[0] === rowIndex && item.cell[1] === columnIndex,
            );
            return branch === undefined ? (
              <span className="rounded-md border border-dashed border-line" key={column} />
            ) : (
              <BranchCard branch={branch} compact key={column} />
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

function Tree({ map }: Readonly<{ map: DecisionMap }>) {
  const columns = map.branches.length;
  return (
    <>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {map.branches.map((branch, index) => (
          <li
            key={branch.when}
            className={columns % 2 === 1 && index === columns - 1 ? "md:col-span-full" : ""}
          >
            <BranchCard branch={branch} />
          </li>
        ))}
      </ul>
      {map.branches.map((branch, index) =>
        branch.children === undefined ? null : (
          <div key={branch.when}>
            <div className="grid grid-cols-1 md:grid-cols-2" aria-hidden="true">
              <ArrowDown
                size={18}
                className={`mx-auto my-2 block text-muted ${index % 2 === 1 ? "md:col-start-2" : ""}`}
              />
            </div>
            <p className="eyebrow mb-2">{branch.when}, then</p>
            <ul className="grid grid-cols-2 gap-2">
              {branch.children.map((child) => (
                <li key={child.when}>
                  <BranchCard branch={child} compact />
                </li>
              ))}
            </ul>
          </div>
        ),
      )}
    </>
  );
}

export function DecisionDiagram({ map }: Readonly<{ map: DecisionMap }>) {
  return (
    <>
      <div className="rounded-md border border-pine/40 bg-surface px-4 py-3 text-center font-display text-lg">
        {map.question}
      </div>
      <ArrowDown size={20} aria-hidden="true" className="mx-auto my-2 block text-muted" />
      {map.axes === undefined ? <Tree map={map} /> : <Matrix map={map} />}
    </>
  );
}
