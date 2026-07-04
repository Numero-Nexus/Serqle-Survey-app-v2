"use client";

import { Progress } from "@/components/ui";
import { useSurveyProgress } from "@/hooks/use-survey-progress";

export function SurveyProgressIndicator() {
  const { currentStep, totalSteps, completionPercentage } = useSurveyProgress();

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{completionPercentage}%</span>
      </div>
      <Progress value={completionPercentage} />
    </div>
  );
}