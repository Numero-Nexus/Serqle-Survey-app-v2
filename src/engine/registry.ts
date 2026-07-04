import type { ComponentType } from "react";
import type { AnswerValue, Question } from "./types";

/** Props every registered question-type component receives. */
export interface QuestionComponentProps<TConfig = unknown> {
  question: Question<TConfig>;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
  error?: string;
}

type QuestionComponent = ComponentType<QuestionComponentProps>;

const registry = new Map<string, QuestionComponent>();

/** Registers a component to render questions of a given `type`. Later phases populate this. */
export function registerQuestionRenderer(
  type: string,
  component: QuestionComponent
): void {
  registry.set(type, component);
}

/** Looks up the component registered for a given question `type`, if any. */
export function getQuestionRenderer(
  type: string
): QuestionComponent | undefined {
  return registry.get(type);
}