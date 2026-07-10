import { BEHAVIOUR_DIMENSIONS, type BehaviourVector } from "./dimensions";

export interface ConfidenceScoreInput {
  behaviourVector: BehaviourVector;
  revisionCount: number;
  attentionCheckPassed: boolean | null;
}

/**
 * Computes a 0–1 confidence score for a Soul Code inference. Never fed back
 * into the Soul Code/Archetype — purely descriptive metadata.
 */
export function computeConfidenceScore(input: ConfidenceScoreInput): number {
  const { behaviourVector, revisionCount, attentionCheckPassed } = input;

  const distances = BEHAVIOUR_DIMENSIONS.map((dim) =>
    Math.abs(behaviourVector[dim] - 0.5)
  );
  const behaviourStrength =
    distances.reduce((sum, d) => sum + d, 0) / distances.length / 0.5;

  const reflection = behaviourVector.reflectionConfidence;
  const consistency = behaviourVector.decisionConsistency;

  const contradictionPenalty = Math.min(1, revisionCount / 10);

  let score =
    0.4 * behaviourStrength +
    0.25 * reflection +
    0.25 * consistency -
    0.2 * contradictionPenalty;

  if (attentionCheckPassed === false) {
    score *= 0.3;
  }

  return Math.min(1, Math.max(0, score));
}