import type { SurveyAction, SurveyState } from "./types";

function clampIndex(index: number, maxIndex: number): number {
  if (index < 0) return 0;
  if (index > maxIndex) return maxIndex;
  return index;
}

function withVisited(state: SurveyState, index: number): number[] {
  if (state.visitedScreenIndices.includes(index)) {
    return state.visitedScreenIndices;
  }
  return [...state.visitedScreenIndices, index];
}

/**
 * Pure reducer for survey state. Contains no side effects and performs
 * boundary protection so navigation can never move outside valid screen indices.
 */
export function surveyReducer(
  state: SurveyState,
  action: SurveyAction
): SurveyState {
  const maxIndex = state.survey.screens.length - 1;

  switch (action.type) {
    case "ANSWER_QUESTION":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.value,
        },
      };

    case "GO_NEXT": {
      const nextIndex = clampIndex(state.currentScreenIndex + 1, maxIndex);
      return {
        ...state,
        currentScreenIndex: nextIndex,
        visitedScreenIndices: withVisited(state, nextIndex),
      };
    }

    case "GO_PREVIOUS": {
      const prevIndex = clampIndex(state.currentScreenIndex - 1, maxIndex);
      return {
        ...state,
        currentScreenIndex: prevIndex,
      };
    }

    case "GO_TO_SCREEN": {
      const targetIndex = clampIndex(action.index, maxIndex);
      return {
        ...state,
        currentScreenIndex: targetIndex,
        visitedScreenIndices: withVisited(state, targetIndex),
      };
    }

    default:
      return state;
  }
}

/** Builds the initial state for a given survey definition. */
export function createInitialSurveyState(
  survey: SurveyState["survey"]
): SurveyState {
  return {
    survey,
    currentScreenIndex: 0,
    answers: {},
    visitedScreenIndices: survey.screens.length > 0 ? [0] : [],
  };
}
