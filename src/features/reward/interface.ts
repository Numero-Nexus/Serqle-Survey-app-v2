import type { RewardComponentName } from "@/research/events/reward-pipeline-types";
import { FEATURE_REGISTRY } from "@/features/registry";

/**
 * Configuration for a single reward component — declares which feature it
 * reads from and its expected value range, WITHOUT computing anything.
 * A future Reward Calculation phase implements the actual aggregation/
 * normalization/weighting logic against this configuration.
 */
export interface RewardComponentConfig {
  name: RewardComponentName;
  /** The feature registry key this component would read from. */
  sourceFeatureKey: string;
  /** Expected value range, for future normalization — not applied here. */
  expectedRange: { min: number; max: number };
}

/**
 * Full reward pipeline configuration — declares the shape of a future
 * reward computation without performing it. Every sourceFeatureKey below
 * must exist in FEATURE_REGISTRY; validated at module load to catch drift
 * between this config and the actual feature registry.
 */
export const REWARD_COMPONENT_CONFIG: readonly RewardComponentConfig[] = [
  {
    name: "decision_speed",
    sourceFeatureKey: "response_time_ms",
    expectedRange: { min: 0, max: 60000 },
  },
  {
    name: "confidence",
    sourceFeatureKey: "answer_revision_count",
    expectedRange: { min: 0, max: 10 },
  },
  {
    name: "consistency",
    sourceFeatureKey: "answer_values",
    expectedRange: { min: 0, max: 1 },
  },
  {
    name: "data_quality",
    sourceFeatureKey: "validation_failure_count",
    expectedRange: { min: 0, max: 10 },
  },
  {
    name: "completion",
    sourceFeatureKey: "completion_flag",
    expectedRange: { min: 0, max: 1 },
  },
] as const;

// Fail fast if configuration drifts from the actual feature registry.
for (const component of REWARD_COMPONENT_CONFIG) {
  const exists = FEATURE_REGISTRY.some((f) => f.key === component.sourceFeatureKey);
  if (!exists) {
    throw new Error(
      `Reward component "${component.name}" references unregistered feature "${component.sourceFeatureKey}"`
    );
  }
}

export const REWARD_CONFIG_VERSION = "1.0.0";