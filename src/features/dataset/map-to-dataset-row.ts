import type { CanonicalEventRow } from "@/db/schema";
import type { FeatureExtractionResult } from "../pipeline/orchestrator";
import { researchDatasetRowSchema, type ResearchDatasetRow } from "./schema";

/**
 * Maps a FeatureExtractionResult (Step 6) plus session-level provenance
 * (pulled from the raw event rows) into a validated ResearchDatasetRow.
 * Pure mapping only — no new derivation logic lives here.
 */
export function mapToDatasetRow(
  result: FeatureExtractionResult,
  sessionEvents: CanonicalEventRow[]
): ResearchDatasetRow {
  const anyEvent = sessionEvents[0];

  const candidate = {
    provenance: {
      sessionId: result.sessionId,
      surveyVersion: anyEvent?.surveyVersion ?? "unknown",
      pipelineVersion: result.pipelineVersion,
      extractedAt: result.extractedAt,
    },
    context: {
      deviceCategory: anyEvent?.deviceCategory ?? "unknown",
      locale: anyEvent?.locale ?? "unknown",
      timezone: anyEvent?.timezone ?? "unknown",
      forwardNavigationCount: result.navigationBehaviour.forwardCount,
      interactionFrequency: result.interactionFrequency,
      totalSessionDurationMs: result.totalSessionDurationMs,
    },
    action: {
      answerValues: result.answerValues,
    },
    reward: {
      rewardVersion: "unversioned",
      finalRewardScore: null,
    },
    quality: {
      completionQuality: result.quality.completionQuality,
      hasMissingResponses: result.quality.missingResponses.hasMissingResponses,
      missingQuestionIds: result.quality.missingResponses.missingQuestionIds,
      isConsistent: result.quality.consistency.isConsistent,
      attentionCheckPassed: result.quality.attentionCheckPassed,
      validationFailureCount: result.quality.validationFailureCount,
      backNavigationCount: result.navigationBehaviour.backCount,
      answerRevisionCount: result.answerRevisionCount,
    },
    responseTimeMs: result.responseTimeMs,
    screenDwellTimeMs: result.screenDwellTimeMs,
    questionDwellTimeMs: result.questionDwellTimeMs,
  };

  return researchDatasetRowSchema.parse(candidate);
}