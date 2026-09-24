import { hierarchy, tree } from "d3-hierarchy";
import { ArrowRight, ChevronDown, TriangleAlert } from "lucide-react";

import type { DecisionBranch, DecisionMap } from "@/lib/study-themes";

type TreeData = {
  id: string;
  branch?: DecisionBranch;
  label?: string;
  children?: TreeData[];
};
type Point = { x: number; y: number };

const NODE_WIDTH = 196;
const NODE_HEIGHT = 210;
const ROOT_HEIGHT = 112;
const RANK_GAP = 56;
const MARGIN = 24;

function toTree(branch: DecisionBranch, id: string): TreeData {
  return {
    id,
    branch,
    children: branch.children?.map((child, index) => toTree(child, `${id}-${index}`)),
  };
}

function buildGraph(map: DecisionMap) {
  const choices = map.branches.filter((branch) => branch.tone !== "always");
  const root: TreeData = { id: "start", label: map.question };

  if (map.sequence === true) {
    let current = root;
    choices.forEach((branch, index) => {
      const next = toTree(branch, `branch-${index}`);
      current.children = [next];
      current = next;
    });
  } else {
    root.children = choices.map((branch, index) => toTree(branch, `branch-${index}`));
  }

  const positioned = tree<TreeData>()
    .nodeSize([NODE_HEIGHT + 24, NODE_WIDTH + RANK_GAP])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.3))(hierarchy(root));
  const descendants = positioned.descendants();
  const minX = Math.min(...descendants.map((node) => node.x));
  const maxX = Math.max(...descendants.map((node) => node.x));
  const maxDepth = Math.max(...descendants.map((node) => node.depth));
  const vertical = map.sequence === true;
  const position = (node: Readonly<{ x: number; y: number }>): Point => ({
    x: vertical ? MARGIN + NODE_WIDTH / 2 + node.x - minX : MARGIN + NODE_WIDTH / 2 + node.y,
    y: vertical ? MARGIN + NODE_HEIGHT / 2 + node.y : MARGIN + NODE_HEIGHT / 2 + node.x - minX,
  });

  return {
    width: vertical
      ? maxX - minX + NODE_WIDTH + MARGIN * 2
      : (maxDepth + 1) * NODE_WIDTH + maxDepth * RANK_GAP + MARGIN * 2,
    height: vertical
      ? maxDepth * (NODE_WIDTH + RANK_GAP) + NODE_HEIGHT + MARGIN * 2
      : maxX - minX + NODE_HEIGHT + MARGIN * 2,
    vertical,
    nodes: descendants.map((node) => ({
      id: node.data.id,
      branch: node.data.branch,
      label: node.data.label,
      width: NODE_WIDTH,
      height: node.depth === 0 ? ROOT_HEIGHT : NODE_HEIGHT,
      position: position(node),
    })),
    edges: positioned.links().map((link) => {
      const source = position(link.source);
      const target = position(link.target);
      return {
        from: link.source.data.id,
        to: link.target.data.id,
        source: vertical
          ? { x: source.x, y: source.y + (link.source.depth === 0 ? ROOT_HEIGHT : NODE_HEIGHT) / 2 }
          : { x: source.x + NODE_WIDTH / 2, y: source.y },
        target: vertical
          ? { x: target.x, y: target.y - NODE_HEIGHT / 2 }
          : { x: target.x - NODE_WIDTH / 2, y: target.y },
      };
    }),
  };
}

function BranchOutline({ branch }: Readonly<{ branch: DecisionBranch }>) {
  return (
    <li className="border-l-2 border-pine/30 pl-4">
      <p className="font-semibold text-ink">
        {branch.when} <ArrowRight size={14} className="inline text-pine" aria-hidden="true" />{" "}
        {branch.action}
      </p>
      {branch.criteria !== undefined && branch.criteria.length > 0 && (
        <div className="mt-2">
          <strong className="text-sm text-muted">Findings</strong>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-soft">
            {branch.criteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {branch.details !== undefined && branch.details.length > 0 && (
        <div className="mt-2">
          <strong className="text-sm text-muted">Clinical details</strong>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-soft">
            {branch.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {branch.followUp !== undefined && (
        <p className="mt-2 text-sm text-ink-soft">
          <strong>Follow-up:</strong> {branch.followUp}
        </p>
      )}
      {branch.children !== undefined && (
        <ul className="mt-4 space-y-4">
          {branch.children.map((child) => (
            <BranchOutline branch={child} key={child.when} />
          ))}
        </ul>
      )}
    </li>
  );
}

function BranchPreview({ branch }: Readonly<{ branch: DecisionBranch }>) {
  return (
    <li className="rounded-md border border-line-strong bg-surface p-4">
      <strong
        className={`text-sm ${branch.tone === "urgent" ? "text-cardinal" : "text-pine-deep"}`}
      >
        {branch.when}
      </strong>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{branch.action}</p>
      {branch.children !== undefined && (
        <ul className="mt-3 space-y-2 border-l-2 border-pine/30 pl-3">
          {branch.children.map((child) => (
            <BranchPreview branch={child} key={child.when} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function DecisionDiagram({ map }: Readonly<{ map: DecisionMap }>) {
  const markerId = `decision-arrow-${map.question.toLowerCase().replaceAll(/[^a-z0-9]+/gu, "-")}`;
  const universal = map.branches.filter((branch) => branch.tone === "always");
  const choices = map.branches.filter((branch) => branch.tone !== "always");
  const ChoiceList = map.sequence === true ? "ol" : "ul";
  const graph = buildGraph(map);
  return (
    <div>
      <h4 className="font-display text-xl leading-snug text-pine-deep min-[800px]:sr-only print:not-sr-only">
        {map.question}
      </h4>
      <p className="mt-1 text-sm text-muted">
        {map.sequence === true
          ? "Follow the arrows in order."
          : "Follow the arrow from the question to the matching finding, then any follow-up choice."}
      </p>
      <div className="mt-4 rounded-md border border-line bg-canvas p-3 min-[800px]:hidden print:block">
        <ChoiceList
          className={`space-y-2 ${map.sequence === true ? "list-decimal pl-5 marker:font-semibold marker:text-pine" : ""}`}
        >
          {choices.map((branch) => (
            <BranchPreview branch={branch} key={branch.when} />
          ))}
        </ChoiceList>
      </div>
      <div className="mt-4 hidden overflow-x-auto rounded-md border border-line bg-canvas min-[800px]:block print:hidden">
        <div
          className="relative mx-auto"
          style={{ width: graph.width, height: graph.height }}
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0"
            width={graph.width}
            height={graph.height}
            viewBox={`0 0 ${graph.width} ${graph.height}`}
          >
            <defs>
              <marker
                id={markerId}
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--color-pine)" />
              </marker>
            </defs>
            {graph.edges.map((edge) => (
              <path
                key={`${edge.from}-${edge.to}`}
                d={
                  graph.vertical
                    ? `M ${edge.source.x} ${edge.source.y} C ${edge.source.x} ${(edge.source.y + edge.target.y) / 2}, ${edge.target.x} ${(edge.source.y + edge.target.y) / 2}, ${edge.target.x} ${edge.target.y}`
                    : `M ${edge.source.x} ${edge.source.y} C ${(edge.source.x + edge.target.x) / 2} ${edge.source.y}, ${(edge.source.x + edge.target.x) / 2} ${edge.target.y}, ${edge.target.x} ${edge.target.y}`
                }
                fill="none"
                stroke="var(--color-pine)"
                strokeWidth="1.5"
                markerEnd={`url(#${markerId})`}
              />
            ))}
          </svg>
          {graph.nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute flex flex-col justify-center rounded-md border px-4 py-3 shadow-card ${node.branch?.tone === "urgent" ? "border-cardinal/50 bg-cardinal-wash" : node.branch === undefined ? "border-pine-deep bg-pine-deep text-white" : "border-line-strong bg-surface"}`}
              style={{
                width: node.width,
                height: node.height,
                left: node.position.x - node.width / 2,
                top: node.position.y - node.height / 2,
              }}
            >
              {node.branch === undefined ? (
                <span className="text-center text-sm font-semibold">{node.label}</span>
              ) : (
                <>
                  <strong
                    className={`text-sm leading-snug ${node.branch.tone === "urgent" ? "text-cardinal" : "text-pine-deep"}`}
                  >
                    {node.branch.tone === "urgent" && (
                      <TriangleAlert size={14} className="mr-1 inline" aria-hidden="true" />
                    )}
                    {node.branch.when}
                  </strong>
                  <p className="mt-2 text-sm leading-snug text-ink-soft">{node.branch.action}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {universal.map((branch) => (
        <div
          className="mt-3 rounded-md border-l-4 border-pine bg-pine-wash px-4 py-3"
          key={branch.when}
        >
          <strong className="text-sm text-pine-deep">Applies to every path</strong>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{branch.action}</p>
        </div>
      ))}
      <details className="group mt-3 rounded-md border border-line bg-surface">
        <summary className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-pine-deep hover:bg-pine-wash">
          Read the full decision path and clinical details
          <ChevronDown
            size={16}
            className="ml-auto transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="border-t border-line px-4 py-5">
          <p className="mb-4 text-sm text-muted">
            {map.sequence === true
              ? "Work through these steps in order."
              : "Choose the matching finding; nested options follow their parent path."}
          </p>
          <ChoiceList className="space-y-5">
            {choices.map((branch) => (
              <BranchOutline branch={branch} key={branch.when} />
            ))}
          </ChoiceList>
          {universal.length > 0 && (
            <div className="mt-5 border-t border-line pt-4">
              <h5 className="mb-3 font-semibold text-pine-deep">For every path</h5>
              <ul className="space-y-4">
                {universal.map((branch) => (
                  <BranchOutline branch={branch} key={branch.when} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
