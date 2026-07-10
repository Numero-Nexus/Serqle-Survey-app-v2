export interface ConsistencyScoreInput {
  isConsistent: boolean | null;
  revisionCount: number;
  backNavigationCount: number;
}

/**
 * Computes a 0–1 internal consistency score from existing quality signals.
 * Metadata only — never modifies survey answers, Soul Code, or Archetype.
 */
export function computeConsistencyScore(input: ConsistencyScoreInput): number {
  const { isConsistent, revisionCount, backNavigationCount } = input;

  const baseline = isConsistent === false ? 0.3 : isConsistent === true ? 1 : 0.6;

  const revisionPenalty = Math.min(0.4, revisionCount * 0.05);
  const hesitationPenalty = Math.min(0.2, backNavigationCount * 0.03);

  const score = baseline - revisionPenalty - hesitationPenalty;

  return Math.min(1, Math.max(0, score));
}