import {
  BEHAVIOUR_DIMENSIONS,
  type BehaviourVector,
  type BehaviourWeightDelta,
} from "./dimensions";
import { getWeightDelta } from "./weights";

/** A single answered question/option pair, as recorded by the survey. */
export interface AnsweredOption {
  questionId: string;
  optionId: string;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * Accumulates weighted deltas from every answered option into a raw
 * per-dimension total (unbounded), before normalization.
 */
function accumulateRawTotals(
  answers: AnsweredOption[]
): Record<string, number> {
  const totals: Record<string, number> = {};

  for (const { questionId, optionId } of answers) {
    const delta: BehaviourWeightDelta = getWeightDelta(questionId, optionId);
    for (const [dimension, value] of Object.entries(delta)) {
      totals[dimension] = (totals[dimension] ?? 0) + (value ?? 0);
    }
  }

  return totals;
}

/**
 * Computes a normalized (0–1) BehaviourVector from a set of answered
 * options. Dimensions with no contributions default to a neutral 0.5.
 */
export function calculateBehaviourVector(
  answers: AnsweredOption[]
): BehaviourVector {
  const rawTotals = accumulateRawTotals(answers);

  const vector = {} as BehaviourVector;
  for (const dimension of BEHAVIOUR_DIMENSIONS) {
    const raw = rawTotals[dimension];
    vector[dimension] = raw === undefined ? 0.5 : clamp01(0.5 + raw / 2);
  }

  return vector;
}