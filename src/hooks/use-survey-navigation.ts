"use client";

import { useCallback } from "react";
import { useSurvey } from "./use-survey";
import {
  canGoNext,
  canGoPrevious,
  isValidScreenIndex,
} from "@/engine/navigation";

/**
 * Exposes navigation actions and boundary-aware guards for the current survey.
 */
export function useSurveyNavigation() {
  const { state, dispatch } = useSurvey();

  const goNext = useCallback(() => {
    dispatch({ type: "GO_NEXT" });
  }, [dispatch]);

  const goPrevious = useCallback(() => {
    dispatch({ type: "GO_PREVIOUS" });
  }, [dispatch]);

  const goToScreen = useCallback(
    (index: number) => {
      if (!isValidScreenIndex(state, index)) return;
      dispatch({ type: "GO_TO_SCREEN", index });
    },
    [dispatch, state]
  );

  return {
    currentScreenIndex: state.currentScreenIndex,
    canGoNext: canGoNext(state),
    canGoPrevious: canGoPrevious(state),
    goNext,
    goPrevious,
    goToScreen,
  };
}