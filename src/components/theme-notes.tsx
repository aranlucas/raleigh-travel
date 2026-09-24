import { ArrowUpRight, BookOpen, CalendarDays } from "lucide-react";
import Link from "next/link";

import { themeFlashcards } from "@/lib/flashcards";
import { domains, practiceBlocks } from "@/lib/study";
import { pdfSources, type StudyTheme } from "@/lib/study-themes";
import { themeDiagrams } from "@/lib/theme-diagrams";

import { EvidenceLinks } from "./evidence-links";
import { FlashcardDeck, FlashcardPrintList } from "./flashcard-deck";
import { StepChain } from "./step-chain";
import { ThemeDiagramList } from "./theme-diagram-list";

function SectionHeading({
  id,
  step,
  title,
  hint,
}: Readonly<{ id: string; step: string; title: string; hint: string }>) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="type-data text-sm text-ochre">{step}</span>
      <h2 className="type-title" id={id}>
        {title}
      </h2>
      <p className="basis-full text-[0.9375rem] text-muted sm:basis-auto">{hint}</p>
    </div>
  );
}

/** One theme as a full study page: learn, picture, drill, then check the sources. */
export function ThemeDetail({ theme }: Readonly<{ theme: StudyTheme }>) {
  const sources = theme.sourceIds.map((id) => {
    const source = pdfSources.find((item) => item.id === id);
    if (source === undefined) {
      throw new Error(`Unknown theme source: ${id}`);
    }
    return source;
  });
  const sessions = practiceBlocks.filter((block) => theme.sessionIds.includes(block.id));
  const themeDomains = domains.filter((domain) => theme.domainIds.includes(domain.id));
  const diagrams = themeDiagrams[theme.id] ?? [];
  const cards = themeFlashcards(theme);
  const sections = [
    { id: "learn", label: "Key points" },
    ...(diagrams.length > 0 ? [{ id: "picture", label: `Diagrams (${diagrams.length})` }] : []),
    { id: "drill", label: `Flashcards (${cards.length})` },
    { id: "sources", label: "Sources" },
  ];

  return (
    <>
      <header className="pt-8 pb-8">
        <p className="eyebrow">
          {themeDomains.length > 0
            ? themeDomains.map((domain) => `${domain.title} ${domain.weight}%`).join(" · ")
            : "How to answer on the day"}
        </p>
        <h1 className="type-display mt-4">{theme.title}</h1>
        <p className="type-lead mt-5 max-w-[60ch]">{theme.summary}</p>
        <div className="panel mt-6 flex flex-col items-start gap-2 px-4 py-4 md:flex-row md:flex-wrap md:items-baseline md:gap-x-5 md:px-6">
          <span className="eyebrow">Remember</span>
          <StepChain text={theme.memoryCue} className="flex-1" />
        </div>
        <nav className="mt-6 flex flex-wrap gap-2 print:hidden" aria-label="On this page">
          {sections.map((section) => (
            <a className="chip" href={`#${section.id}`} key={section.id}>
              {section.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="scroll-mt-6 border-t border-line py-10" aria-labelledby="learn">
        <SectionHeading id="learn" step="01" title="Key points" hint="Read once, slowly." />
        <ol className="mt-6 grid list-none gap-4 lg:grid-cols-2">
          {theme.points.map((point, index) => (
            <li className="card flex gap-4 p-5" key={point.text}>
              <span className="type-data pt-0.5 text-sm text-pine" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <p className="text-base leading-relaxed text-ink-soft">{point.text}</p>
                <EvidenceLinks evidence={point.evidence} />
              </div>
            </li>
          ))}
        </ol>
        <aside className="callout mt-5 px-5 py-4">
          <strong className="text-sm text-ochre">Don’t miss this</strong>
          <p className="mt-1 max-w-[65ch] text-base leading-relaxed text-ink-soft">
            {theme.pitfall.text}
          </p>
          <EvidenceLinks evidence={theme.pitfall.evidence} />
        </aside>
      </section>

      {diagrams.length > 0 && (
        <section className="scroll-mt-6 border-t border-line py-10" aria-labelledby="picture">
          <SectionHeading
            id="picture"
            step="02"
            title="Picture the decision"
            hint="Follow each path, then say it without looking."
          />
          <ThemeDiagramList diagrams={diagrams} />
        </section>
      )}

      <section className="scroll-mt-6 border-t border-line py-10" aria-labelledby="drill">
        <SectionHeading
          id="drill"
          step={diagrams.length > 0 ? "03" : "02"}
          title="Flashcards"
          hint="Answer out loud before you flip. Mark the ones to see again."
        />
        <div className="mt-6 max-w-[48rem]">
          <FlashcardDeck cards={cards} />
          <FlashcardPrintList cards={cards} />
        </div>
      </section>

      <section
        className="grid scroll-mt-6 gap-8 border-t border-line py-10 lg:grid-cols-2"
        aria-labelledby="sources"
      >
        <div>
          <h2 className="type-heading" id="sources">
            <BookOpen className="mr-2 inline text-pine" size={20} aria-hidden="true" />
            Sources combined ({sources.length})
          </h2>
          <ul className="mt-4 space-y-3">
            {sources.map((source) => (
              <li key={source.id}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[0.9375rem] underline underline-offset-3"
                >
                  {source.title}
                  <ArrowUpRight size={12} aria-hidden="true" />
                  <span className="sr-only"> (PDF opens in a new tab)</span>
                </a>
                <span className="mt-0.5 block text-sm text-muted">
                  {source.revision} · {source.pageCount} PDF pages
                  {source.note === undefined ? "" : ` · ${source.note}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="type-heading">
            <CalendarDays className="mr-2 inline text-sky" size={20} aria-hidden="true" />
            In your practice plan
          </h2>
          <ul className="mt-4 space-y-2">
            {sessions.map((block) => (
              <li key={block.id}>
                <Link className="link" href={`/study/sessions/${block.id}`}>
                  {block.day} · {block.time} · {block.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
