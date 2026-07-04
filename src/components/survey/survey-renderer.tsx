"use client";

import { useSurvey } from "@/hooks/use-survey";
import { useSurveyValidation } from "@/hooks/use-survey-validation";
import { QuestionRenderer } from "./question-renderer";

/**
 * Renders all questions on the current screen. Content-agnostic:
 * delegates actual question rendering to QuestionRenderer's registry.
 */
export function SurveyRenderer() {
  const { state, dispatch } = useSurvey();
  const { errors } = useSurveyValidation();
  const currentScreen = state.survey.screens[state.currentScreenIndex];

  if (!currentScreen) {
    return (
      <div role="alert" className="text-sm text-muted-foreground">
        No screen available at the current position.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {currentScreen.questions.map((question) => (
        <QuestionRenderer
          key={question.id}
          question={question}
          value={state.answers[question.id] ?? null}
          onChange={(value) =>
            dispatch({ type: "ANSWER_QUESTION", questionId: question.id, value })
          }
          error={errors[question.id]}
        />
      ))}
    </div>
  );
}