/**
 * A single question within a screen. Content-agnostic: `type` is a free-form
 * discriminator that future phases use to register concrete renderers.
 * `config` holds type-specific configuration without the engine needing to know its shape.
 */
export interface Question<TConfig = unknown> {
  id: string;
  type: string;
  required?: boolean;
  config?: TConfig;
}

/** A screen groups one or more questions shown together as a single navigable step. */
export interface Screen {
  id: string;
  questions: Question[];
}

/** A survey is an ordered sequence of screens. */
export interface Survey {
  id: string;
  screens: Screen[];
}

/** A single answer value, keyed by question id. Value shape is intentionally generic. */
export type AnswerValue = string | number | boolean | string[] | null;

/** Map of question id -> answer value. */
export type AnswersMap = Record<string, AnswerValue>;

/** Runtime state of an in-progress survey. */
export interface SurveyState {
  survey: Survey;
  currentScreenIndex: number;
  answers: AnswersMap;
  visitedScreenIndices: number[];
}

/** All state transitions the engine supports. */
export type SurveyAction =
  | { type: "ANSWER_QUESTION"; questionId: string; value: AnswerValue }
  | { type: "GO_NEXT" }
  | { type: "GO_PREVIOUS" }
  | { type: "GO_TO_SCREEN"; index: number };