/**
 * Canonical list of continuous behavioural dimensions.
 * Each survey option contributes weighted deltas to one or more of these —
 * never a single dimension, and never a personality label directly.
 */
export const BEHAVIOUR_DIMENSIONS = [
  "socialIntensity",
  "socialFamiliarity",
  "planningPreference",
  "noveltySeeking",
  "riskAppetite",
  "energyLevel",
  "learningOrientation",
  "experienceOrientation",
  "natureAffinity",
  "urbanAffinity",
  "budgetSensitivity",
  "travelWillingness",
  "reflectionConfidence",
  "decisionConsistency",
] as const;

export type BehaviourDimension = (typeof BEHAVIOUR_DIMENSIONS)[number];

/** A sparse set of weighted deltas an answer option contributes. */
export type BehaviourWeightDelta = Partial<Record<BehaviourDimension, number>>;

/** Fully computed, normalized behaviour vector (0–1 per dimension). */
export type BehaviourVector = Record<BehaviourDimension, number>;