"use client";

import { createContext, ReactNode, useReducer } from "react";
import { createInitialSurveyState, surveyReducer } from "./reducer";
import type { Survey, SurveyAction, SurveyState } from "./types";

export interface SurveyContextValue {
  state: SurveyState;
  dispatch: React.Dispatch<SurveyAction>;
}

export const SurveyContext = createContext<SurveyContextValue | undefined>(
  undefined
);

interface SurveyProviderProps {
  survey: Survey;
  children: ReactNode;
}

/**
 * Provides survey state and dispatch to the component tree.
 * Content-agnostic: accepts any `Survey` definition.
 */
export function SurveyProvider({ survey, children }: SurveyProviderProps) {
  const [state, dispatch] = useReducer(
    surveyReducer,
    survey,
    createInitialSurveyState
  );

  return (
    <SurveyContext.Provider value={{ state, dispatch }}>
      {children}
    </SurveyContext.Provider>
  );
}