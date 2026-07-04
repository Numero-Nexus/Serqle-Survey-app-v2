import type { ComponentType } from "react";
import { registerQuestionRenderer, type QuestionComponentProps } from "@/engine/registry";
import { SingleChoiceQuestion } from "./single-choice-question";
import { MultiChoiceQuestion } from "./multi-choice-question";

/**
 * Centralized registration of all question-type renderers.
 * Import this module once (in the survey page/layout) before rendering SurveyRenderer.
 *
 * Components are authored with their specific config type for internal type
 * safety, then widened to the registry's generic `unknown`-config signature
 * here at the registration boundary — this is the registry's intended
 * type-erasure point, not a weakening of the components themselves.
 */
export function registerSurveyQuestions() {
  registerQuestionRenderer(
    "single-choice",
    SingleChoiceQuestion as ComponentType<QuestionComponentProps>
  );
  registerQuestionRenderer(
    "multi-choice",
    MultiChoiceQuestion as ComponentType<QuestionComponentProps>
  );
}