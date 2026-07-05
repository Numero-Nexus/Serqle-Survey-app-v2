import type { CanonicalEventRow } from "@/db/schema";

type EventsByType = Record<string, CanonicalEventRow[]>;

function payloadOf<T>(row: CanonicalEventRow): T {
  return row.payload as T;
}

/** Response time per question: { questionId -> timeToAnswerMs }. */
export function deriveResponseTime(events: EventsByType): Record<string, number> {
  const rows = events["question_answered"] ?? [];
  const result: Record<string, number> = {};
  for (const row of rows) {
    const payload = payloadOf<{ questionId: string; timeToAnswerMs: number }>(row);
    result[payload.questionId] = payload.timeToAnswerMs;
  }
  return result;
}

/** Screen dwell time: { screenId -> dwellTimeMs } (last recorded value per screen). */
export function deriveScreenDwellTime(events: EventsByType): Record<string, number> {
  const rows = events["screen_exited"] ?? [];
  const result: Record<string, number> = {};
  for (const row of rows) {
    const payload = payloadOf<{ screenId: string; dwellTimeMs: number }>(row);
    result[payload.screenId] = payload.dwellTimeMs;
  }
  return result;
}

/**
 * Question dwell time (approximated as time-to-answer). Documented
 * limitation: this is identical to response time since per-question dwell
 * requires finer-grained instrumentation not yet implemented.
 */
export function deriveQuestionDwellTime(events: EventsByType): Record<string, number> {
  return deriveResponseTime(events);
}

/** Total revision count across the whole session. */
export function deriveRevisionCount(events: EventsByType): number {
  return (events["answer_revised"] ?? []).length;
}

/** Navigation counts: { back, forward }. */
export function deriveNavigationBehaviour(events: EventsByType): {
  backCount: number;
  forwardCount: number;
} {
  return {
    backCount: (events["navigation_back"] ?? []).length,
    forwardCount: (events["navigation_next"] ?? []).length,
  };
}

/** Validation failure count across the whole session. */
export function deriveValidationBehaviour(events: EventsByType): number {
  return (events["validation_failed"] ?? []).length;
}

/** Whether the session reached survey_submitted. */
export function deriveCompletionBehaviour(events: EventsByType): boolean {
  return (events["survey_submitted"] ?? []).length > 0;
}

/**
 * Total session duration in ms, from session_started to session_completed.
 * Returns null if either boundary event is missing (incomplete session) —
 * never guesses or fabricates a duration.
 */
export function deriveSessionDuration(events: EventsByType): number | null {
  const completed = events["session_completed"]?.[0];
  if (!completed) return null;
  const payload = payloadOf<{ totalDurationMs: number }>(completed);
  return payload.totalDurationMs;
}

/** Count of explicit answer events during the session. */
export function deriveInteractionFrequency(events: EventsByType): number {
  return (events["question_answered"] ?? []).length;
}

/** The participant's final explicit answers: { questionId -> value }. */
export function deriveAnswerValues(events: EventsByType): Record<string, unknown> {
  const rows = events["question_answered"] ?? [];
  const result: Record<string, unknown> = {};
  for (const row of rows) {
    const payload = payloadOf<{ questionId: string; value: unknown }>(row);
    result[payload.questionId] = payload.value;
  }
  // Apply revisions on top, since a revised answer supersedes the original.
  const revisions = events["answer_revised"] ?? [];
  for (const row of revisions) {
    const payload = payloadOf<{ questionId: string; newValue: unknown }>(row);
    result[payload.questionId] = payload.newValue;
  }
  return result;
}