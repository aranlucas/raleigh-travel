import { ArrowDown, ArrowRight, CalendarClock, TriangleAlert } from "lucide-react";
import { Fragment } from "react";

import type { DecisionBranch, DecisionMap } from "@/lib/study-themes";

/*
 * Layouts respond to the figure's width (`@container` on the parent), not the viewport.
 * Connectors are drawn only at widths where every branch sits in a single row.
 */

type RowLayout = Readonly<{ grid: string; bar: string; stem: string; arrow: string }>;

const rowLayouts: Readonly<Record<number, RowLayout>> = {
  1: { grid: "", bar: "hidden", stem: "", arrow: "hidden" },
  2: {
    grid: "@2xl:grid-cols-2",
    bar: "hidden @2xl:block",
    stem: "@2xl:pt-4 @2xl:before:block",
    arrow: "@2xl:grid",
  },
  3: {
    grid: "@4xl:grid-cols-3",
    bar: "hidden @4xl:block",
    stem: "@4xl:pt-4 @4xl:before:block",
    arrow: "@4xl:grid",
  },
  4: {
    grid: "@2xl:grid-cols-2 @5xl:grid-cols-4",
    bar: "hidden @5xl:block",
    stem: "@5xl:pt-4 @5xl:before:block",
    arrow: "@5xl:grid",
  },
};
const wrappedLayout: RowLayout = {
  grid: "@2xl:grid-cols-2 @4xl:grid-cols-3",
  bar: "hidden",
  stem: "",
  arrow: "hidden",
};

function layoutFor(count: number) {
  return rowLayouts[count] ?? wrappedLayout;
}

function Section({ label, items }: Readonly<{ label: string; items?: readonly string[] }>) {
  if (items === undefined || items.length === 0) {
    return null;
  }
  return (
    <div className="mt-2.5">
      <span className="text-[0.6875rem] font-semibold tracking-wider text-muted uppercase">
        {label}
      </span>
      <ul className="mt-0.5 space-y-0.5">
        {items.map((item) => (
          <li
            className="relative pl-3 text-sm leading-snug text-ink-soft before:absolute before:top-[0.55em] before:left-0 before:size-1 before:rounded-full before:bg-pine/50"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BranchCard({
  branch,
  className = "",
  hideWhen = "",
}: Readonly<{ branch: DecisionBranch; className?: string; hideWhen?: string }>) {
  const urgent = branch.tone === "urgent";
  return (
    <div
      className={`flex flex-col rounded-md border p-3.5 ${urgent ? "border-cardinal/35 bg-cardinal-wash" : "border-line bg-surface"} ${className}`}
      data-branch={branch.when}
    >
      {urgent ? (
        <span className="eyebrow mb-1 gap-1 text-cardinal">
          <TriangleAlert size={12} aria-hidden="true" /> Escalate
        </span>
      ) : null}
      <strong
        className={`block text-xs font-semibold tracking-wide uppercase ${urgent ? "text-cardinal" : "text-pine"} ${hideWhen}`}
      >
        {branch.when}
      </strong>
      <p className="mt-1 text-[0.9375rem] leading-snug font-semibold text-ink">{branch.action}</p>
      <Section label="Findings" items={branch.criteria} />
      <Section label="Details" items={branch.details} />
      {branch.children === undefined ? null : (
        <p className="mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-pine">
          {branch.children.length} options below <ArrowDown size={13} aria-hidden="true" />
        </p>
      )}
      {branch.followUp === undefined ? null : (
        <p className="mt-auto flex items-start gap-1.5 pt-3 text-sm leading-snug text-muted">
          <CalendarClock size={14} className="mt-0.5 text-pine" aria-hidden="true" />
          <span>
            <span className="sr-only">Follow-up: </span>
            {branch.followUp}
          </span>
        </p>
      )}
    </div>
  );
}

function Stem() {
  return <div className="mx-auto h-4 w-px bg-line-strong" aria-hidden="true" />;
}

/** One row of alternatives, joined to the node above by a bar when they fit on one line. */
function BranchRow({ branches }: Readonly<{ branches: readonly DecisionBranch[] }>) {
  const layout = layoutFor(branches.length);
  const inset = `calc(50% / ${branches.length})`;
  return (
    <ul className={`relative grid gap-3 ${layout.grid}`}>
      <span
        className={`absolute top-0 h-px bg-line-strong ${layout.bar}`}
        style={{ left: inset, right: inset }}
        aria-hidden="true"
      />
      {branches.map((branch) => (
        <li
          className={`relative flex flex-col before:absolute before:top-0 before:left-1/2 before:hidden before:h-4 before:w-px before:bg-line-strong ${layout.stem}`}
          key={branch.when}
        >
          <BranchCard branch={branch} className="flex-1" />
        </li>
      ))}
    </ul>
  );
}

function Tree({ map }: Readonly<{ map: DecisionMap }>) {
  const choices = map.branches.filter((branch) => branch.tone !== "always");
  const always = map.branches.filter((branch) => branch.tone === "always");
  return (
    <>
      <Stem />
      <BranchRow branches={choices} />
      {choices.map((branch) =>
        branch.children === undefined ? null : (
          <div className="mt-5" key={branch.when}>
            <div className="mx-auto max-w-xl rounded-md border border-pine/30 bg-pine-wash px-4 py-2 text-center text-[0.9375rem] font-semibold text-pine-deep">
              {branch.when}: which option?
            </div>
            <Stem />
            <BranchRow branches={branch.children} />
          </div>
        ),
      )}
      {always.map((branch) => (
        <div
          className="mt-3 rounded-md border border-dashed border-pine/45 bg-pine-wash px-3.5 py-3"
          data-branch={branch.when}
          key={branch.when}
        >
          <span className="eyebrow text-pine">Always · {branch.when}</span>
          <p className="mt-0.5 text-[0.9375rem] leading-snug font-semibold text-ink">
            {branch.action}
          </p>
          <div className="grid gap-x-8 @2xl:grid-cols-2">
            <Section label="Findings" items={branch.criteria} />
            <Section label="Details" items={branch.details} />
          </div>
          {branch.followUp === undefined ? null : (
            <p className="mt-2.5 flex items-start gap-1.5 text-sm leading-snug text-muted">
              <CalendarClock size={14} className="mt-0.5 text-pine" aria-hidden="true" />
              <span>
                <span className="sr-only">Follow-up: </span>
                {branch.followUp}
              </span>
            </p>
          )}
        </div>
      ))}
    </>
  );
}

function Sequence({ map }: Readonly<{ map: DecisionMap }>) {
  const count = map.branches.length;
  const layout = layoutFor(count);
  return (
    <ol className={`mt-3 grid gap-3 ${layout.grid}`}>
      {map.branches.map((branch, index) => (
        <li className="relative flex flex-col" key={branch.when}>
          <span className="type-data absolute -top-2 -left-2 z-10 grid size-6 place-items-center rounded-full bg-pine-deep text-xs font-semibold text-white">
            {index + 1}
          </span>
          <BranchCard branch={branch} className="flex-1" />
          {index < count - 1 ? (
            <span
              className={`absolute top-1/2 -right-3 hidden h-6 w-3 -translate-y-1/2 place-items-center text-muted ${layout.arrow}`}
              aria-hidden="true"
            >
              <ArrowRight size={12} />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

const matrixColumns: Readonly<Record<number, string>> = {
  2: "@3xl:grid-cols-[auto_repeat(2,minmax(0,1fr))]",
  3: "@3xl:grid-cols-[auto_repeat(3,minmax(0,1fr))]",
};

function Matrix({ map }: Readonly<{ map: DecisionMap }>) {
  const axes = map.axes;
  if (axes === undefined) {
    return null;
  }
  return (
    <div className={`mt-3 grid gap-2 ${matrixColumns[axes.columns.length] ?? ""}`}>
      <span className="hidden @3xl:block" />
      {axes.columns.map((column) => (
        <span
          className="hidden justify-self-center rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-pine-deep ring-1 ring-pine/20 @3xl:block"
          key={column}
        >
          {column}
        </span>
      ))}
      {axes.rows.map((row, rowIndex) => (
        <Fragment key={row}>
          <span className="hidden rotate-180 self-center text-xs font-semibold tracking-wide text-pine-deep [writing-mode:vertical-rl] @3xl:block">
            {row}
          </span>
          {axes.columns.map((column, columnIndex) => {
            const branch = map.branches.find(
              (item) => item.cell?.[0] === rowIndex && item.cell[1] === columnIndex,
            );
            return branch === undefined ? (
              <span className="rounded-md border border-dashed border-line" key={column} />
            ) : (
              <BranchCard branch={branch} hideWhen="@3xl:sr-only" key={column} />
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

export function DecisionDiagram({ map }: Readonly<{ map: DecisionMap }>) {
  return (
    <>
      <div className="mx-auto max-w-2xl rounded-md bg-pine-deep px-4 py-2.5 text-center font-display text-lg leading-snug text-white">
        {map.question}
      </div>
      {map.sequence === true ? (
        <Sequence map={map} />
      ) : map.axes === undefined ? (
        <Tree map={map} />
      ) : (
        <Matrix map={map} />
      )}
    </>
  );
}
