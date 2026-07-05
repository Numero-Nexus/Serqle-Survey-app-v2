import { freeTimeSurvey } from "@/data/survey";
import type { CanonicalEventRow } from "@/db/schema";
import { deriveAnswerValues, deriveCompletionBehaviour } from "./transform";

type EventsByType = Record<string, CanonicalEventRow[]>;

/**
 * Whether the session reached completion. Directly reuses
 * deriveCompletionBehaviour — quality indicators must never duplicate
 * transformation logic, only compose it.
 */
export function deriveCompletionQuality(events: EventsByType): boolean {
  return deriveCompletionBehaviour(events);
}

/**
 * Whether every required question across the entire survey definition has
 * a recorded answer. Uses the actual survey content (src/data/survey.ts)
 * as ground truth for what "complete" means — never guesses.
 */
export function deriveMissingResponseIndicator(events: EventsByType): {
  missingQuestionIds: string[];
  hasMissingResponses: boolean;
} {
  const answers = deriveAnswerValues(events);
  const missingQuestionIds: string[] = [];

  for (const screen of freeTimeSurvey.screens) {
    for (const question of screen.questions) {
      if (question.required && answers[question.id] === undefined) {
        missingQuestionIds.push(question.id);
      }
    }
  }

  return {
    missingQuestionIds,
    hasMissingResponses: missingQuestionIds.length > 0,
  };
}

/**
 * Deterministic consistency check: does Card 1 and Card 7's answer belong
 * to the same option-index position (both scenarios share the same
 * 4-option structure per Phase 4's design). This is a boolean match, not a
 * derived "consistency score."
 */
export function deriveConsistencyIndicator(events: EventsByType): {
  card1Answer: unknown;
  card7Answer: unknown;
  isConsistent: boolean | null;
} {
  const answers = deriveAnswerValues(events);
  const card1 = answers["card-1"];
  const card7 = answers["card-7"];

  if (card1 === undefined || card7 === undefined) {
    return { card1Answer: card1 ?? null, card7Answer: card7 ?? null, isConsistent: null };
  }

  // Map each card's option value to its structural position (0-3) using
  // the actual survey definition — no hardcoded guesses about meaning.
  const card1Screen = freeTimeSurvey.screens.find((s) =>
    s.questions.some((q) => q.id === "card-1")
  );
  const card7Screen = freeTimeSurvey.screens.find((s) =>
    s.questions.some((q) => q.id === "card-7")
  );
  const card1Options = card1Screen?.questions.find((q) => q.id === "card-1")?.config as
    | { options: { value: string }[] }
    | undefined;
  const card7Options = card7Screen?.questions.find((q) => q.id === "card-7")?.config as
    | { options: { value: string }[] }
    | undefined;

  const card1Index = card1Options?.options.findIndex((o) => o.value === card1) ?? -1;
  const card7Index = card7Options?.options.findIndex((o) => o.value === card7) ?? -1;

  return {
    card1Answer: card1,
    card7Answer: card7,
    isConsistent: card1Index !== -1 && card1Index === card7Index,
  };
}

/** Whether the attention check (Card 8) was answered with the expected value. */
export function deriveAttentionCheckIndicator(events: EventsByType): boolean | null {
  const answers = deriveAnswerValues(events);
  const value = answers["card-8"];
  if (value === undefined) return null;
  return value === "blue";
}

/** Count of failed validation attempts, exposed here for quality reporting. */
export function deriveValidationQualityIndicator(events: EventsByType): number {
  return (events["validation_failed"] ?? []).length;
}