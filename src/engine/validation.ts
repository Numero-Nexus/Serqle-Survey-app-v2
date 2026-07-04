import type { AnswerValue, Question, Screen } from "./types";

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/** A single validation rule: given a question and its answer, return an error message or null if valid. */
export type ValidationRule = (
  question: Question,
  value: AnswerValue
) => string | null;

/** Fails if the value is missing, empty string, or an empty array. */
export const requiredRule: ValidationRule = (question, value) => {
  if (!question.required) return null;

  const isEmpty =
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);

  return isEmpty ? "This field is required." : null;
};

/** Runs all provided rules against a single question/answer pair, returning the first error found. */
export function validateQuestion(
  question: Question,
  value: AnswerValue,
  rules: ValidationRule[] = [requiredRule]
): string | null {
  for (const rule of rules) {
    const error = rule(question, value);
    if (error) return error;
  }
  return null;
}

/** Validates every question on a screen against the given answers map. */
export function validateScreen(
  screen: Screen,
  answers: Record<string, AnswerValue>,
  rules: ValidationRule[] = [requiredRule]
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const question of screen.questions) {
    const value = answers[question.id] ?? null;
    const error = validateQuestion(question, value, rules);
    if (error) {
      errors[question.id] = error;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}