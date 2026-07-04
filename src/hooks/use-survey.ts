"use client";

import { useContext } from "react";
import { SurveyContext, type SurveyContextValue } from "@/engine/context";

/**
 * Base hook for accessing survey state and dispatch.
 * Throws if used outside a SurveyProvider, protecting against invalid state access.
 */
export function useSurvey(): SurveyContextValue {
  const context = useContext(SurveyContext);

  if (context === undefined) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }

  return context;
}