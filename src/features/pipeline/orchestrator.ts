import { extractSessionEventsByType } from "./extract";
import {
  deriveResponseTime,
  deriveScreenDwellTime,
  deriveQuestionDwellTime,
  deriveRevisionCount,
  deriveNavigationBehaviour,
  deriveValidationBehaviour,
  deriveCompletionBehaviour,
  deriveSessionDuration,
  deriveInteractionFrequency,
  deriveAnswerValues,
} from "./transform";
import {
  deriveCompletionQuality,
  deriveMissingResponseIndicator,
  deriveConsistencyIndicator,
  deriveAttentionCheckIndicator,
  deriveValidationQualityIndicator,
} from "./quality";

export const PIPELINE_VERSION = "1.0.0";

export interface FeatureExtractionResult {
  sessionId: string;
  pipelineVersion: string;
  extractedAt: string;

  responseTimeMs: Record<string, number>;
  screenDwellTimeMs: Record<string, number>;
  questionDwellTimeMs: Record<string, number>;
  answerRevisionCount: number;
  navigationBehaviour: { backCount: number; forwardCount: number };
  validationFailureCount: number;
  completionFlag: boolean;
  totalSessionDurationMs: number | null;
  interactionFrequency: number;
  answerValues: Record<string, unknown>;

  quality: {
    completionQuality: boolean;
    missingResponses: { missingQuestionIds: string[]; hasMissingResponses: boolean };
    consistency: { card1Answer: unknown; card7Answer: unknown; isConsistent: boolean | null };
    attentionCheckPassed: boolean | null;
    validationFailureCount: number;
  };
}

/**
 * Runs the full feature extraction pipeline for a single session,
 * deterministically. Calling this twice for the same session (same
 * underlying canonical events) always produces an identical result,
 * excluding `extractedAt` which records when the pipeline ran.
 */
export async function runFeaturePipeline(
  sessionId: string
): Promise<FeatureExtractionResult> {
  const eventsByType = await extractSessionEventsByType(sessionId);

  return {
    sessionId,
    pipelineVersion: PIPELINE_VERSION,
    extractedAt: new Date().toISOString(),

    responseTimeMs: deriveResponseTime(eventsByType),
    screenDwellTimeMs: deriveScreenDwellTime(eventsByType),
    questionDwellTimeMs: deriveQuestionDwellTime(eventsByType),
    answerRevisionCount: deriveRevisionCount(eventsByType),
    navigationBehaviour: deriveNavigationBehaviour(eventsByType),
    validationFailureCount: deriveValidationBehaviour(eventsByType),
    completionFlag: deriveCompletionBehaviour(eventsByType),
    totalSessionDurationMs: deriveSessionDuration(eventsByType),
    interactionFrequency: deriveInteractionFrequency(eventsByType),
    answerValues: deriveAnswerValues(eventsByType),

    quality: {
      completionQuality: deriveCompletionQuality(eventsByType),
      missingResponses: deriveMissingResponseIndicator(eventsByType),
      consistency: deriveConsistencyIndicator(eventsByType),
      attentionCheckPassed: deriveAttentionCheckIndicator(eventsByType),
      validationFailureCount: deriveValidationQualityIndicator(eventsByType),
    },
  };
}