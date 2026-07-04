/**
 * Typed shape of the reward pipeline's future output. No computation logic
 * lives here — this only defines the contract a future phase will
 * implement against, per this phase's "specification only" scope.
 */

export type RewardComponentName =
  | "decision_speed"
  | "confidence"
  | "consistency"
  | "data_quality"
  | "completion";

export interface RewardComponent {
  name: RewardComponentName;
  /** Raw, unaggregated value sourced from a research variable. */
  rawValue: number;
}

export interface AggregatedReward {
  participantSessionId: string;
  components: RewardComponent[];
  rewardVersion: string;
}

export interface NormalizedReward extends AggregatedReward {
  normalizedComponents: Record<RewardComponentName, number>;
}

export interface WeightedReward extends NormalizedReward {
  weights: Record<RewardComponentName, number>;
  finalScore: number;
}