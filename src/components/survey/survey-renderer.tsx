"use client";

import { useEffect, useRef } from "react";
import { useSurvey } from "@/hooks/use-survey";
import { useSurveyValidation } from "@/hooks/use-survey-validation";
import { QuestionRenderer } from "./question-renderer";
import { useValidationDisplay } from "./validation-display-context";

/**
 * Renders all questions on the current screen. Content-agnostic:
 * delegates actual question rendering to QuestionRenderer's registry.
 */
export function SurveyRenderer() {
  const { state, dispatch } = useSurvey();
  const { errors } = useSurveyValidation();
  const { hasAttemptedNext, resetAttempted } = useValidationDisplay();
  const currentScreen = state.survey.screens[state.currentScreenIndex];
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    resetAttempted();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- resetAttempted is stable-in-practice (single setState wrapper); including it would re-run this effect unnecessarily.
  }, [state.currentScreenIndex]);

  if (!currentScreen) {
    return (
      <div role="alert" className="text-sm text-muted-foreground">
        No screen available at the current position.
      </div>
    );
  }

  return (
    <div
      key={currentScreen.id}
      className="flex flex-col gap-6 screen-transition"
    >
      <h2 ref={headingRef} tabIndex={-1} className="sr-only">
        {`Screen ${state.currentScreenIndex + 1} of ${state.survey.screens.length}`}
      </h2>
      {currentScreen.questions.map((question) => (
        <QuestionRenderer
          key={question.id}
          question={question}
          value={state.answers[question.id] ?? null}
          onChange={(value) =>
            dispatch({ type: "ANSWER_QUESTION", questionId: question.id, value })
          }
          error={hasAttemptedNext ? errors[question.id] : undefined}
        />
      ))}
    </div>
  );
}