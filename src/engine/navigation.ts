import type { SurveyState } from "./types";

/** True if there is a screen after the current one. */
export function canGoNext(state: SurveyState): boolean {
  return state.currentScreenIndex < state.survey.screens.length - 1;
}

/** True if there is a screen before the current one. */
export function canGoPrevious(state: SurveyState): boolean {
  return state.currentScreenIndex > 0;
}

/** True if the given index is a valid, in-bounds screen index. */
export function isValidScreenIndex(
  state: SurveyState,
  index: number
): boolean {
  return index >= 0 && index < state.survey.screens.length;
}