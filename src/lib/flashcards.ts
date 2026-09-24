import { rulesByTheme } from "./recap";
import { studyThemes, type Evidence, type StudyTheme } from "./study-themes";

export type CardKind = "decision" | "rule" | "cue" | "trap";

export type Flashcard = Readonly<{
  id: string;
  themeId: string;
  themeTitle: string;
  kind: CardKind;
  front: string;
  back: string;
  evidence?: readonly Evidence[];
}>;

export const cardKindLabels: Readonly<Record<CardKind, string>> = {
  decision: "Explain the decision",
  rule: "If this, then…",
  cue: "Memory cue",
  trap: "Classic trap",
};

/**
 * Every card restates content already in the theme notes or recap rules, so the
 * deck never adds claims that are not cited elsewhere.
 */
export function themeFlashcards(theme: StudyTheme): Flashcard[] {
  const decisions = theme.decisions.map((decision, index): Flashcard => ({
    themeId: theme.id,
    themeTitle: theme.shortTitle,
    id: `${theme.id}-decision-${index}`,
    kind: "decision",
    front: decision.question,
    back: decision.answer,
    evidence: decision.evidence,
  }));
  const rules = (rulesByTheme[theme.id] ?? []).map((rule, index): Flashcard => ({
    themeId: theme.id,
    themeTitle: theme.shortTitle,
    id: `${theme.id}-rule-${index}`,
    kind: "rule",
    front: rule.when,
    back: rule.say,
  }));
  return [
    ...decisions,
    ...rules,
    {
      themeId: theme.id,
      themeTitle: theme.shortTitle,
      id: `${theme.id}-trap`,
      kind: "trap",
      front: `What is the classic trap in ${theme.shortTitle.toLowerCase()}?`,
      back: theme.pitfall.text,
      evidence: theme.pitfall.evidence,
    },
    {
      themeId: theme.id,
      themeTitle: theme.shortTitle,
      id: `${theme.id}-cue`,
      kind: "cue",
      front: `Say the memory cue for ${theme.shortTitle.toLowerCase()}.`,
      back: theme.memoryCue,
    },
  ];
}

export const allFlashcards: readonly Flashcard[] = studyThemes.flatMap((theme) =>
  themeFlashcards(theme),
);
