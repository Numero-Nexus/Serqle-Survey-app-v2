"use client";

import { useMemo } from "react";
import { useSurvey } from "./use-survey";
import { validateScreen, type ValidationResult } from "@/engine/validation";

/**
 * Validates the current screen's answers against its questions' rules.
 * Recomputes only when the current screen or relevant answers change.
 */
export function useSurveyValidation(): ValidationResult {
  const { state } = useSurvey();
  const currentScreen = state.survey.screens[state.currentScreenIndex];

  return useMemo(() => {
    if (!currentScreen) {
      return { valid: true, errors: {} };
    }
    return validateScreen(currentScreen, state.answers);
  }, [currentScreen, state.answers]);
}