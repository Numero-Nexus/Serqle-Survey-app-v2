import type { CanonicalEventRow } from "@/db/schema";
import type { FeatureExtractionResult } from "../pipeline/orchestrator";
import { researchDatasetRowSchema, type ResearchDatasetRow } from "./schema";
import { computeBehaviourMapping, type AnsweredOption } from "@/features/behaviour";
import { computeConfidenceScore } from "@/features/behaviour/confidence-score";
import { computeConsistencyScore } from "@/features/behaviour/consistency-score";

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

  const answeredOptions: AnsweredOption[] = Object.entries(result.answerValues)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .map(([questionId, optionId]) => ({ questionId, optionId }));

  const sessionStartedEvent = sessionEvents.find((e) => e.type === "session_started");
  const payload = sessionStartedEvent?.payload as Record<string, unknown> | undefined;
  const rawAttribution = payload?.attribution as
    | {
        source: string | null;
        medium: string | null;
        campaign: string | null;
        content: string | null;
        term: string | null;
        sharePlatform: string | null;
      }
    | undefined;

  const attribution = rawAttribution ?? null;

  let personality: {
    behaviourVector: Record<string, number> | null;
    soulCode: string | null;
    soulArchetype: string | null;
    confidenceScore: number | null;
    consistencyScore: number | null;
  };

  try {
    const mapping = computeBehaviourMapping(answeredOptions);
    const confidenceScore = computeConfidenceScore({
      behaviourVector: mapping.behaviourVector,
      revisionCount: result.answerRevisionCount,
      attentionCheckPassed: result.quality.attentionCheckPassed,
    });
    const consistencyScore = computeConsistencyScore({
      isConsistent: result.quality.consistency.isConsistent,
      revisionCount: result.answerRevisionCount,
      backNavigationCount: result.navigationBehaviour.backCount,
    });

    personality = {
      behaviourVector: mapping.behaviourVector,
      soulCode: mapping.soulCode,
      soulArchetype: mapping.soulArchetype,
      confidenceScore,
      consistencyScore,
    };
  } catch (error) {
    console.error("[behaviour-engine] mapping failed for session", result.sessionId, error);
    personality = {
      behaviourVector: null,
      soulCode: null,
      soulArchetype: null,
      confidenceScore: null,
      consistencyScore: null,
    };
  }

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
    personality,
    attribution,
    responseTimeMs: result.responseTimeMs,
    screenDwellTimeMs: result.screenDwellTimeMs,
    questionDwellTimeMs: result.questionDwellTimeMs,
  };

  return researchDatasetRowSchema.parse(candidate);
}