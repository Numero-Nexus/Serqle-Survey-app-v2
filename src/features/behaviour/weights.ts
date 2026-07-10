import type { BehaviourWeightDelta } from "./dimensions";

/**
 * Maps a survey question's option id to its weighted behaviour deltas.
 * Keyed by `${questionId}:${optionId}` so the same option id can be reused
 * across different questions without collision.
 *
 * This is the ONLY place option → dimension weights are defined. Recalibrating
 * an option's influence means editing a value here, never survey/UI logic.
 */
export const BEHAVIOUR_WEIGHT_TABLE: Record<string, BehaviourWeightDelta> = {
  // Example seed entry — replace/extend with real question/option ids
  // as they're wired up in a later step.
  "leisure-choice:coffee-with-friend": {
    socialFamiliarity: 0.9,
    planningPreference: 0.2,
    energyLevel: 0.2,
    noveltySeeking: 0.1,
  },
};

/** Looks up the weight delta for a given question/option pair. */
export function getWeightDelta(
  questionId: string,
  optionId: string
): BehaviourWeightDelta {
  return BEHAVIOUR_WEIGHT_TABLE[`${questionId}:${optionId}`] ?? {};
}