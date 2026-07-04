"use client";

import { getQuestionRenderer } from "@/engine/registry";
import type { AnswerValue, Question } from "@/engine/types";

interface QuestionRendererProps {
  question: Question;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
  error?: string;
}

/**
 * Dynamically dispatches to the component registered for `question.type`.
 * Renders a safe fallback if no renderer is registered for the type.
 */
export function QuestionRenderer({
  question,
  value,
  onChange,
  error,
}: QuestionRendererProps) {
  const Component = getQuestionRenderer(question.type);

  if (!Component) {
    return (
      <div role="alert" className="text-sm text-muted-foreground">
        No renderer registered for question type &quot;{question.type}&quot;.
      </div>
    );
  }

  return (
    // eslint-disable-next-line react-hooks/static-components -- Component is looked up by key from a registry, not created during render; the underlying reference is stable across renders for a given question.type.
    <Component
      question={question}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
}