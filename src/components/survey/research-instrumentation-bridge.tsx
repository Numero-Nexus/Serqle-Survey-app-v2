"use client";

import { useEffect } from "react";
import { useResearchInstrumentation } from "@/research/instrumentation/use-research-instrumentation";
import { researchCollector } from "@/research/instrumentation/collector";

/**
 * Bridges the survey engine to research instrumentation. Rendered inside
 * SurveyProvider so it can observe engine state; has no visual output.
 */
export function ResearchInstrumentationBridge() {
  useEffect(() => {
    researchCollector.start();
    return () => researchCollector.stop();
  }, []);

  useResearchInstrumentation();

  return null;
}