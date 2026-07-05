"use server";

import { runFeaturePipeline } from "./orchestrator";
import { extractSessionEvents } from "./extract";
import { mapToDatasetRow } from "@/features/dataset/map-to-dataset-row";

/**
 * Server Action entry point for running the feature pipeline against a
 * given session. Intended for future consumers (dataset export tooling,
 * admin views) — not wired into the participant-facing survey UI.
 */
export async function runPipelineForSessionAction(sessionId: string) {
  const result = await runFeaturePipeline(sessionId);
  const events = await extractSessionEvents(sessionId);
  const datasetRow = mapToDatasetRow(result, events);
  return { result, datasetRow };
}