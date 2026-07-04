"use client";

import type { QuestionComponentProps } from "@/engine/registry";
import type { MultiChoiceConfig } from "@/data/survey";
import { ScenarioCard } from "./scenario-card";
import { OptionCard } from "./option-card";

export function MultiChoiceQuestion({
  question,
  value,
  onChange,
  error,
}: QuestionComponentProps<MultiChoiceConfig>) {
  const config = question.config;

  if (!config) return null;

  const selectedValues = Array.isArray(value) ? value : [];
  const atLimit = selectedValues.length >= config.maxSelections;

  function toggle(optionValue: string) {
    const isSelected = selectedValues.includes(optionValue);

    if (isSelected) {
      onChange(selectedValues.filter((v) => v !== optionValue));
      return;
    }

    if (atLimit) return;

    onChange([...selectedValues, optionValue]);
  }

  return (
    <ScenarioCard prompt={config.prompt} error={error}>
      {config.options.map((option) => {
        const selected = selectedValues.includes(option.value);
        const disabled = !selected && atLimit;

        return (
          <div key={option.value} className={disabled ? "opacity-50" : undefined}>
            <OptionCard
              label={option.label}
              icon={option.icon}
              selected={selected}
              onSelect={() => toggle(option.value)}
              role="checkbox"
            />
          </div>
        );
      })}
    </ScenarioCard>
  );
}