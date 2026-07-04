import type { AnswerValue } from "@/engine/types";

// ---- Lifecycle ----

export interface SessionStartedPayload {
  deviceType: "mobile" | "tablet" | "desktop" | "unknown";
  viewportWidth: number;
  viewportHeight: number;
}

export interface SessionCompletedPayload {
  totalDurationMs: number;
}

// ---- Interaction ----

export interface QuestionAnsweredPayload {
  questionId: string;
  screenId: string;
  value: AnswerValue;
  /** Time from screen entry to this answer, in ms. */
  timeToAnswerMs: number;
}

export interface AnswerRevisedPayload {
  questionId: string;
  screenId: string;
  previousValue: AnswerValue;
  newValue: AnswerValue;
  revisionCount: number;
}

// ---- Navigation ----

export interface ScreenEnteredPayload {
  screenId: string;
  screenIndex: number;
}

export interface ScreenExitedPayload {
  screenId: string;
  screenIndex: number;
  dwellTimeMs: number;
}

export interface NavigationBackPayload {
  fromScreenId: string;
  toScreenId: string;
}

export interface NavigationNextPayload {
  fromScreenId: string;
  toScreenId: string;
}

// ---- Validation ----

export interface ValidationFailedPayload {
  screenId: string;
  failedQuestionIds: string[];
}

export interface ValidationPassedPayload {
  screenId: string;
}

// ---- Submission ----

export interface SurveySubmittedPayload {
  totalScreens: number;
  totalQuestions: number;
}

// ---- Research (implicit signals) ----

export interface HesitationObservedPayload {
  questionId: string;
  screenId: string;
  /** Pause duration before final commit, in ms. */
  pauseDurationMs: number;
}

export interface DwellTimeRecordedPayload {
  screenId: string;
  dwellTimeMs: number;
}

/**
 * Canonical taxonomy: maps every sanctioned event `type` string to its
 * payload shape. This is the single source of truth for "what events are
 * allowed to exist" — anything not listed here has not been justified
 * against the research ontology and must not be emitted.
 */
export interface EventPayloadMap {
  session_started: SessionStartedPayload;
  session_completed: SessionCompletedPayload;
  question_answered: QuestionAnsweredPayload;
  answer_revised: AnswerRevisedPayload;
  screen_entered: ScreenEnteredPayload;
  screen_exited: ScreenExitedPayload;
  navigation_back: NavigationBackPayload;
  navigation_next: NavigationNextPayload;
  validation_failed: ValidationFailedPayload;
  validation_passed: ValidationPassedPayload;
  survey_submitted: SurveySubmittedPayload;
  hesitation_observed: HesitationObservedPayload;
  dwell_time_recorded: DwellTimeRecordedPayload;
}

export type EventType = keyof EventPayloadMap;