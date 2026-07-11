import { z } from "zod";

/** Context variables: covariates describing the session, not participant choices. */
export const contextVariablesSchema = z.object({
  deviceCategory: z.string(),
  locale: z.string(),
  timezone: z.string(),
  forwardNavigationCount: z.number().int().nonnegative(),
  interactionFrequency: z.number().int().nonnegative(),
  totalSessionDurationMs: z.number().nonnegative().nullable(),
});

/** Action variables: the participant's explicit, declared choices. */
export const actionVariablesSchema = z.object({
  answerValues: z.record(z.string(), z.unknown()),
});

/**
 * Reward variables: PLACEHOLDER ONLY. No computation occurs in this phase —
 * every field is nullable/optional and unpopulated until a future Reward
 * Calculation phase implements it. Presence here is structural, not
 * functional, per "Do NOT calculate rewards."
 */
export const rewardVariablesSchema = z.object({
  rewardVersion: z.string(),
  finalRewardScore: z.number().nullable(),
});

/** Quality variables: deterministic, non-subjective indicators of data integrity. */
export const qualityVariablesSchema = z.object({
  completionQuality: z.boolean(),
  hasMissingResponses: z.boolean(),
  missingQuestionIds: z.array(z.string()),
  isConsistent: z.boolean().nullable(),
  attentionCheckPassed: z.boolean().nullable(),
  validationFailureCount: z.number().int().nonnegative(),
  backNavigationCount: z.number().int().nonnegative(),
  answerRevisionCount: z.number().int().nonnegative(),
});

/** Provenance: identifies the source and version context of this dataset row. */
export const provenanceVariablesSchema = z.object({
  sessionId: z.string(),
  surveyVersion: z.string(),
  pipelineVersion: z.string(),
  extractedAt: z.string().datetime(),
});

/**
 * Personality variables: internal-only inference metadata derived from the
 * Behaviour Engine. Never exposed to participants. Optional/nullable for
 * backward compatibility with rows produced before this phase.
 */
export const personalityVariablesSchema = z.object({
  behaviourVector: z.record(z.string(), z.number()).nullable(),
  soulCode: z.string().nullable(),
  soulArchetype: z.string().nullable(),
  confidenceScore: z.number().min(0).max(1).nullable(),
  consistencyScore: z.number().min(0).max(1).nullable(),
});

/**
 * Attribution variables: records how the participant discovered the survey.
 * Optional/nullable for backward compatibility with rows produced before
 * this phase; unknown traffic defaults to "direct" upstream, never null source.
 */
export const attributionVariablesSchema = z.object({
  source: z.string().nullable(),
  medium: z.string().nullable(),
  campaign: z.string().nullable(),
  content: z.string().nullable(),
  term: z.string().nullable(),
  sharePlatform: z.string().nullable(),
});


/** The full canonical research dataset row schema. */

export const researchDatasetRowSchema = z.object({
  provenance: provenanceVariablesSchema,
  context: contextVariablesSchema,
  action: actionVariablesSchema,
  reward: rewardVariablesSchema,
  quality: qualityVariablesSchema,
  personality: personalityVariablesSchema,
  attribution: attributionVariablesSchema.nullable().default(null),
  // Per-question/per-screen timing maps, kept nested since they're keyed data.
  responseTimeMs: z.record(z.string(), z.number()),
  screenDwellTimeMs: z.record(z.string(), z.number()),
  questionDwellTimeMs: z.record(z.string(), z.number()),
});

export type ResearchDatasetRow = z.infer<typeof researchDatasetRowSchema>;