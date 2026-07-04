"use client";

import { useSurvey } from "./use-survey";
import {
  getCompletionPercentage,
  getCurrentStepNumber,
  getTotalSteps,
} from "@/engine/progress";

/**
 * Exposes derived progress information for the current survey.
 */
export function useSurveyProgress() {
  const { state } = useSurvey();

  return {
    currentStep: getCurrentStepNumber(state),
    totalSteps: getTotalSteps(state),
    completionPercentage: getCompletionPercentage(state),
  };
}