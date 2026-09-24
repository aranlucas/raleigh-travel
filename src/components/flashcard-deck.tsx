"use client";

import { Check, ChevronLeft, ChevronRight, RotateCcw, Shuffle, Undo2 } from "lucide-react";
import { useMemo, useState, useSyncExternalStore, type KeyboardEvent } from "react";

import { cardKindLabels, type Flashcard } from "@/lib/flashcards";

import { EvidenceLinks } from "./evidence-links";

type Mark = "known" | "again";
type Progress = Readonly<Record<string, Mark>>;

// Progress is a per-browser convenience, shared by every deck on the site.
const STORAGE_KEY = "boards-flashcards-v1";
const CHANGE_EVENT = "boards-flashcards-change";
let memory = "{}";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}
function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? memory;
  } catch {
    return memory;
  }
}
const readServer = () => "{}";

function writeStored(progress: Progress) {
  memory = JSON.stringify(progress);
  try {
    window.localStorage.setItem(STORAGE_KEY, memory);
  } catch {
    // Private windows can block storage; the in-memory copy still works for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseProgress(raw: string): Progress {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return {};
  }
  if (!isRecord(parsed)) {
    return {};
  }
  const progress: Record<string, Mark> = {};
  for (const [id, value] of Object.entries(parsed)) {
    if (value === "known" || value === "again") {
      progress[id] = value;
    }
  }
  return progress;
}

function shuffled(ids: readonly string[]) {
  const next = [...ids];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [next[index], next[swap]] = [next[swap], next[index]];
  }
  return next;
}

export function FlashcardDeck({
  cards,
  showTheme = false,
}: Readonly<{ cards: readonly Flashcard[]; showTheme?: boolean }>) {
  const raw = useSyncExternalStore(subscribe, readStored, readServer);
  const progress = useMemo(() => parseProgress(raw), [raw]);
  const [order, setOrder] = useState(() => cards.map((card) => card.id));
  const [learningOnly, setLearningOnly] = useState(false);
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const byId = useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards]);
  const visible = order
    .filter((id) => !learningOnly || progress[id] !== "known")
    .flatMap((id) => {
      const card = byId.get(id);
      return card === undefined ? [] : [card];
    });
  const known = cards.filter((card) => progress[card.id] === "known").length;
  const again = cards.filter((card) => progress[card.id] === "again").length;
  const index = Math.min(position, Math.max(visible.length - 1, 0));
  const card = visible.at(index);

  function go(step: number) {
    if (visible.length === 0) {
      return;
    }
    setPosition((index + step + visible.length) % visible.length);
    setFlipped(false);
  }
  function mark(value: Mark) {
    if (card === undefined) {
      return;
    }
    writeStored({ ...progress, [card.id]: value });
    setFlipped(false);
    // In "still learning" mode a known card leaves the list, so the next card slides into place.
    if (!(learningOnly && value === "known")) {
      setPosition(visible.length > 0 ? (index + 1) % visible.length : 0);
    }
  }
  function reset() {
    const rest: Record<string, Mark> = { ...progress };
    for (const item of cards) {
      delete rest[item.id];
    }
    writeStored(rest);
    setLearningOnly(false);
    setPosition(0);
    setFlipped(false);
  }
  function handleKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowRight") {
      go(1);
    } else if (event.key === "ArrowLeft") {
      go(-1);
    } else if (event.key === "1" && flipped) {
      mark("again");
    } else if (event.key === "2" && flipped) {
      mark("known");
    } else {
      return;
    }
    event.preventDefault();
  }

  return (
    <div className="print:hidden">
      <div className="flex flex-wrap items-center gap-2">
        <fieldset className="flex flex-wrap gap-2">
          <legend className="sr-only">Which cards</legend>
          <button
            className="chip"
            type="button"
            aria-pressed={!learningOnly}
            onClick={() => {
              setLearningOnly(false);
              setPosition(0);
              setFlipped(false);
            }}
          >
            All {cards.length}
          </button>
          <button
            className="chip"
            type="button"
            aria-pressed={learningOnly}
            onClick={() => {
              setLearningOnly(true);
              setPosition(0);
              setFlipped(false);
            }}
          >
            Still learning {cards.length - known}
          </button>
        </fieldset>
        <span className="ml-auto flex gap-2">
          <button
            className="btn btn-secondary min-h-9 px-3 text-sm"
            type="button"
            onClick={() => {
              setOrder(shuffled(order));
              setPosition(0);
              setFlipped(false);
            }}
          >
            <Shuffle size={15} aria-hidden="true" /> Shuffle
          </button>
          <button
            className="btn btn-secondary min-h-9 px-3 text-sm disabled:pointer-events-none disabled:opacity-45"
            type="button"
            onClick={reset}
            disabled={known + again === 0}
          >
            <RotateCcw size={15} aria-hidden="true" /> Reset
          </button>
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm text-muted">
        <progress
          className="h-1.5 flex-1 appearance-none overflow-hidden rounded-full bg-sunk [&::-moz-progress-bar]:bg-pine [&::-webkit-progress-bar]:bg-sunk [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-pine"
          aria-label="Cards known"
          max={cards.length}
          value={known}
        />
        <span className="type-data whitespace-nowrap">
          {known} known · {again} again
        </span>
      </div>

      {card === undefined ? (
        <div className="panel mt-4 px-6 py-12 text-center">
          <Check className="mx-auto text-pine" size={28} aria-hidden="true" />
          <p className="type-heading mt-3">Every card in this deck is marked known.</p>
          <p className="mt-2 text-[0.9375rem] text-muted">
            Run the whole deck once more, or reset and start fresh.
          </p>
          <button
            className="btn btn-primary mt-5"
            type="button"
            onClick={() => {
              setLearningOnly(false);
              setPosition(0);
            }}
          >
            Review all {cards.length}
          </button>
        </div>
      ) : (
        <>
          <div className="relative mt-4 mb-6 [perspective:1600px]">
            {/* The rest of the deck, peeking out beneath the current card. */}
            {Array.from({ length: Math.min(visible.length - 1, 2) }, (_, depth) => {
              const layer = Math.min(visible.length - 1, 2) - 1 - depth;
              return (
                <span
                  aria-hidden="true"
                  className={`absolute rounded-lg border border-line bg-surface ${layer === 0 ? "inset-x-3 -bottom-2 top-2" : "inset-x-6 -bottom-4 top-4 opacity-70"}`}
                  key={layer}
                />
              );
            })}
            <button
              type="button"
              className="relative grid w-full cursor-pointer text-left transition-transform duration-500 ease-out-soft [transform-style:preserve-3d] motion-reduce:transition-none"
              style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
              onClick={() => {
                setFlipped(!flipped);
              }}
              onKeyDown={handleKey}
              aria-label={
                flipped
                  ? `Answer: ${card.back}. Press to see the question again.`
                  : `Question: ${card.front}. Press to reveal the answer.`
              }
            >
              <span
                className="card flex min-h-64 flex-col p-6 shadow-card [grid-area:1/1] [backface-visibility:hidden] sm:min-h-72 sm:p-9"
                aria-hidden={flipped}
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow text-pine">{cardKindLabels[card.kind]}</span>
                  {showTheme ? (
                    <span className="rounded-full bg-sunk px-2 py-0.5 text-xs text-ink-soft">
                      {card.themeTitle}
                    </span>
                  ) : null}
                  <CardMark mark={progress[card.id]} />
                </span>
                <span className="my-auto py-6 font-display text-2xl leading-snug text-balance sm:text-3xl">
                  {card.kind === "rule" ? `${card.front} →` : card.front}
                </span>
                <span className="text-sm text-muted">
                  Answer out loud, then tap or press Space to check.
                </span>
              </span>
              <span
                className="flex min-h-64 flex-col rounded-lg border border-pine-deep bg-pine-deep p-6 text-white shadow-lift [grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:min-h-72 sm:p-9"
                aria-hidden={!flipped}
              >
                <span className="line-clamp-2 text-sm leading-snug text-pine-wash">
                  {card.kind === "rule" ? `${card.front} →` : card.front}
                </span>
                <span className="my-auto py-6 text-lg leading-relaxed text-pretty sm:text-xl">
                  {card.back}
                </span>
                <span className="text-sm text-white/70">Press 1 for again, 2 if you had it.</span>
              </span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              className="btn btn-secondary size-10 px-0"
              type="button"
              onClick={() => {
                go(-1);
              }}
              aria-label="Previous card"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <span className="type-data text-sm text-muted" aria-live="polite">
              {index + 1} / {visible.length}
            </span>
            <button
              className="btn btn-secondary size-10 px-0"
              type="button"
              onClick={() => {
                go(1);
              }}
              aria-label="Next card"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <span className="ml-auto flex gap-2">
              {flipped ? (
                <>
                  <button
                    className="btn border-ochre-bright bg-ochre-wash text-ochre hover:bg-ochre-bright hover:text-white"
                    type="button"
                    onClick={() => {
                      mark("again");
                    }}
                  >
                    <Undo2 size={16} aria-hidden="true" /> Again
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      mark("known");
                    }}
                  >
                    <Check size={16} aria-hidden="true" /> Got it
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    setFlipped(true);
                  }}
                >
                  Show answer
                </button>
              )}
            </span>
          </div>
          {flipped && card.evidence !== undefined ? (
            <p className="mt-3 text-sm text-muted">
              Source: <EvidenceLinks evidence={card.evidence} className="mt-1 inline-flex" />
            </p>
          ) : null}
          <p className="mt-3 text-xs text-muted">
            Keyboard: Space flips · ← → move · 1 again · 2 got it. Progress is saved in this browser
            only.
          </p>
        </>
      )}
    </div>
  );
}

function CardMark({ mark }: Readonly<{ mark: Mark | undefined }>) {
  if (mark === undefined) {
    return null;
  }
  return (
    <span
      className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${mark === "known" ? "bg-pine-wash text-pine-deep" : "bg-ochre-wash text-ochre"}`}
    >
      {mark === "known" ? "Known" : "Again"}
    </span>
  );
}

/** Every card as a plain list, for printing. */
export function FlashcardPrintList({ cards }: Readonly<{ cards: readonly Flashcard[] }>) {
  return (
    <ol className="hidden list-decimal pl-5 print:block">
      {cards.map((card) => (
        <li className="break-inside-avoid border-b border-line py-1.5" key={card.id}>
          <strong>{card.front}</strong> — {card.back}
        </li>
      ))}
    </ol>
  );
}
