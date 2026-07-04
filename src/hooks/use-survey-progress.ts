"use client";

import { useMemo } from "react";
import { useSurvey } from "./use-survey";
import {
  getCompletionPercentage,
  getCurrentStepNumber,
  getTotalSteps,
} from "@/engine/progress";

/**
 * Exposes derived progress information for the current survey.
 * Memoized so consumers don't recompute/re-render when unrelated state
 * (e.g. answers on other questions) changes without affecting progress.
 */
export function useSurveyProgress() {
  const { state } = useSurvey();

  return useMemo(
    () => ({
      currentStep: getCurrentStepNumber(state),
      totalSteps: getTotalSteps(state),
      completionPercentage: getCompletionPercentage(state),
    }),
    [state]
  );
}