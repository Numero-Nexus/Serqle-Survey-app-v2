"use client";

import type { QuestionComponentProps } from "@/engine/registry";
import type { SingleChoiceConfig } from "@/data/survey";
import { ScenarioCard } from "./scenario-card";
import { OptionCard } from "./option-card";

export function SingleChoiceQuestion({
  question,
  value,
  onChange,
  error,
}: QuestionComponentProps<SingleChoiceConfig>) {
  const config = question.config;

  if (!config) return null;

  return (
    <ScenarioCard prompt={config.prompt} error={error}>
      {config.options.map((option) => (
        <OptionCard
          key={option.value}
          label={option.label}
          icon={option.icon}
          selected={value === option.value}
          onSelect={() => onChange(option.value)}
          role="radio"
        />
      ))}
    </ScenarioCard>
  );
}