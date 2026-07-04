import type { SurveyState } from "./types";

/** 1-based index of the current screen (for human-readable display, e.g. "Step 2 of 5"). */
export function getCurrentStepNumber(state: SurveyState): number {
  return state.currentScreenIndex + 1;
}

/** Total number of screens in the survey. */
export function getTotalSteps(state: SurveyState): number {
  return state.survey.screens.length;
}

/** Completion percentage (0-100) based on the furthest screen visited. */
export function getCompletionPercentage(state: SurveyState): number {
  const total = getTotalSteps(state);
  if (total === 0) return 0;

  const furthestVisited = Math.max(...state.visitedScreenIndices, 0);
  const percentage = ((furthestVisited + 1) / total) * 100;

  return Math.min(100, Math.round(percentage));
}