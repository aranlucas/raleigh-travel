import { ArrowRight, ChevronDown, FileText, Leaf } from "lucide-react";
import Link from "next/link";

import { parseTime } from "@/lib/itinerary";
import { domains, type PracticeBlock, type PracticeCase } from "@/lib/study";
import { studyThemes } from "@/lib/study-themes";

import { AfterThis } from "./after-this";
import { ExternalLink } from "./ui";

/** The working part of a practice session: timed steps, themes, domains, and sources. */
export function PracticeBlockBody({ block }: Readonly<{ block: PracticeBlock }>) {
  return (
    <div>
      <StepTimeline block={block} />
      <div className="my-6 rounded-md bg-sunk px-4 py-4">
        <span className="eyebrow">REVIEW FOR THIS SESSION</span>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {studyThemes
            .filter((theme) => theme.sessionIds.includes(block.id))
            .map((theme) => (
              <Link className="link" href={`/study/themes/${theme.id}`} key={theme.id}>
                {theme.shortTitle} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            ))}
        </div>
      </div>
      {block.domains.length > 0 && (
        <div className="card overflow-hidden">
          {block.domains.map((id) => {
            const domain = domains.find((item) => item.id === id);
            if (domain === undefined) {
              throw new Error(`Unknown study domain: ${id}`);
            }
            return (
              <details
                className="group scroll-mt-6 border-t border-line first:border-t-0"
                key={id}
                id={`domain-${id}`}
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 hover:bg-pine-wash max-md:gap-2 max-md:px-3">
                  <span className="type-data min-w-10 text-sm font-medium text-pine max-md:min-w-[26px] max-md:text-sm">
                    {domain.weight}%
                  </span>
                  <span>
                    <strong className="type-subhead block">{domain.title}</strong>
                    <small className="mt-1 block text-sm text-muted">{domain.checkpoint}</small>
                  </span>
                  <ChevronDown
                    size={18}
                    className="ml-auto transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 pb-6 text-base max-md:px-4 max-md:pb-5">
                  <details className="group/tasks mt-2 rounded-md border border-line">
                    <summary className="flex items-center gap-2 px-4 py-3 text-sm font-semibold">
                      Every blueprint task ({domain.tasks.length})
                      <span className="font-normal text-muted">· {domain.blueprintTitle}</span>
                      <ChevronDown
                        size={16}
                        className="ml-auto shrink-0 transition-transform group-open/tasks:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <ul className="border-t border-line px-4 py-2">
                      {domain.tasks.map((task) => (
                        <li
                          className="flex items-baseline gap-3 py-1.5 text-[0.9375rem] leading-snug"
                          key={task.text}
                        >
                          <span
                            className={`type-data w-8 shrink-0 text-[0.6875rem] font-medium ${task.level === "Analyze/Evaluate" ? "text-cardinal" : "text-sky"}`}
                            title={task.level}
                          >
                            {task.level === "Analyze/Evaluate" ? "A/E" : "U/A"}
                          </span>
                          {task.text}
                        </li>
                      ))}
                    </ul>
                    <p className="border-t border-line px-4 py-2 text-xs text-muted">
                      U/A = understand/apply · A/E = analyze/evaluate: expect to weigh options and
                      justify, not just recall.
                    </p>
                  </details>
                  <h3 className="pt-5 text-sm font-semibold">Decision points to rehearse</h3>
                  <ul className="mt-2 list-disc pl-5">
                    {domain.essentials.map((point) => (
                      <li
                        className="max-w-[65ch] py-1 pl-1 leading-relaxed text-ink-soft"
                        key={point}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="my-5 mb-2 space-y-2 rounded-md bg-pine-wash px-5 py-4 leading-relaxed">
                    <p className="eyebrow">SAY IT OUT LOUD · ORIGINAL PRACTICE PROMPT</p>
                    <p>{domain.prompt}</p>
                    <p>
                      <strong>Change one thing:</strong> {domain.challenge}
                    </p>
                  </div>
                  <h3 className="pt-3 text-sm font-semibold">Read to resolve a gap</h3>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {domain.resources.map((resource) => (
                      <ExternalLink {...resource} key={resource.href} />
                    ))}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      )}
      {block.resources.length > 0 && (
        <div className="pt-1">
          <p className="eyebrow">KEEP THESE HANDY</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {block.resources.map((resource) => (
              <ExternalLink key={resource.href} {...resource} />
            ))}
          </div>
        </div>
      )}
      {(block.id === "sun-recap" || block.id === "mon-review") && (
        <Link className={`link mt-5`} href="/study/recap">
          <FileText size={16} aria-hidden="true" /> Open the one-page recap
        </Link>
      )}
      <p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-pine">
        <Leaf size={17} aria-hidden="true" />
        {block.finish}
      </p>
      <AfterThis blockId={block.id} />
    </div>
  );
}

function clock(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = String(minutes % 60).padStart(2, "0");
  return `${hours % 12 === 0 ? 12 : hours % 12}:${rest}`;
}

/**
 * The session's steps on a bar proportional to their minutes, labeled with the
 * clock time each step starts. Untimed sessions (the flight) count from zero.
 */
function StepTimeline({ block }: Readonly<{ block: PracticeBlock }>) {
  const start = parseTime(block.time)?.start;
  const steps = block.steps.map((step, index) => {
    const offset = block.steps.slice(0, index).reduce((total, item) => total + item.minutes, 0);
    return {
      ...step,
      number: index + 1,
      at: start === undefined ? `+${offset} min` : clock(start + offset),
    };
  });
  return (
    <div className="mb-8">
      <div className="flex gap-1" aria-hidden="true">
        {steps.map((step) => (
          <span
            className="min-w-0"
            style={{ flexGrow: step.minutes, flexBasis: 0 }}
            key={step.task}
          >
            <span
              className={`block h-2 rounded-full ${step.number % 2 === 0 ? "bg-pine/55" : "bg-pine"}`}
            />
            <span className="type-data mt-1.5 block truncate text-xs text-muted">
              {step.number} · {step.at}
            </span>
          </span>
        ))}
      </div>
      <ol className="mt-5 list-none p-0">
        {steps.map((step) => (
          <li
            className="grid grid-cols-[1.75rem_4.5rem_minmax(0,1fr)] items-baseline gap-3 border-t border-line py-3 text-base first:border-t-0 max-md:grid-cols-[1.5rem_4rem_minmax(0,1fr)]"
            key={step.task}
          >
            <span className="type-data text-sm font-medium text-pine">{step.number}</span>
            <span className="type-data text-sm text-ochre">
              {step.at}
              <span className="block text-xs text-muted">{step.minutes} min</span>
            </span>
            <div>
              <p>{step.task}</p>
              {step.case === undefined ? null : <CaseCard practice={step.case} />}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CaseCard({ practice }: Readonly<{ practice: PracticeCase }>) {
  const theme = studyThemes.find((item) => item.id === practice.themeId);
  return (
    <div className="mt-3 rounded-lg border border-line bg-surface p-4 sm:p-5">
      <p className="eyebrow text-pine">The case</p>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">{practice.scenario}</p>
      <details className="group/check mt-3 border-t border-line pt-3">
        <summary className="flex items-center gap-2 text-sm font-semibold text-pine-deep">
          Answer out loud, then check what to cover
          <ChevronDown
            size={15}
            className="transition-transform group-open/check:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
          {practice.cover.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        {theme === undefined ? null : (
          <Link className="link mt-3 text-sm" href={`/study/themes/${theme.id}`}>
            Sources in {theme.shortTitle} <ArrowRight size={13} aria-hidden="true" />
          </Link>
        )}
      </details>
      {practice.twist === undefined ? null : (
        <p className="mt-3 rounded-md bg-ochre-wash px-3 py-2 text-[0.9375rem] leading-relaxed text-ink">
          <strong className="font-semibold text-ochre">Then change one thing: </strong>
          {practice.twist}
        </p>
      )}
    </div>
  );
}
