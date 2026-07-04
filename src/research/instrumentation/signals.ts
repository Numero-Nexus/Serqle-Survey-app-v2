import type { EventType } from "@/research/events/taxonomy";

/**
 * Explicit signals: information the participant directly and knowingly
 * provided (a selection, a response, a declared input). These carry the
 * actual research data points the survey instrument was designed to collect.
 */
export const EXPLICIT_EVENT_TYPES: readonly EventType[] = [
  "question_answered",
] as const;

/**
 * Implicit signals: behavioural exhaust collected silently around the
 * explicit response — timing, revisions, navigation, validation, and
 * completion behaviour. Never shown to participants (per Phase 4 spec).
 */
export const IMPLICIT_EVENT_TYPES: readonly EventType[] = [
  "session_started",
  "session_completed",
  "answer_revised",
  "screen_entered",
  "screen_exited",
  "navigation_back",
  "navigation_next",
  "validation_failed",
  "validation_passed",
  "survey_submitted",
  "hesitation_observed",
  "dwell_time_recorded",
] as const;

export type SignalKind = "explicit" | "implicit";

/**
 * Classifies an event type as explicit or implicit. Throws if a type is
 * unclassified — every event in the taxonomy MUST belong to exactly one
 * category, per the "strictly separated" requirement.
 */
export function classifySignal(type: EventType): SignalKind {
  if (EXPLICIT_EVENT_TYPES.includes(type)) return "explicit";
  if (IMPLICIT_EVENT_TYPES.includes(type)) return "implicit";
  throw new Error(
    `Event type "${type}" is not classified as explicit or implicit. Every event must be classified before use.`
  );
}