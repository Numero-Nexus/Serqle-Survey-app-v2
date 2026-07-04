"use client";

import { ReactNode } from "react";

interface ScenarioCardProps {
  prompt: string;
  error?: string;
  children: ReactNode;
}

/**
 * Wraps a question prompt and its option grid. Reused by single-choice
 * and multi-choice question components.
 */
export function ScenarioCard({ prompt, error, children }: ScenarioCardProps) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="text-base sm:text-lg font-semibold text-foreground">
        {prompt}
      </legend>
      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-3">
        {children}
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  );
}