"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSurveyNavigation } from "@/hooks/use-survey-navigation";
import { useSurveyValidation } from "@/hooks/use-survey-validation";
import { useValidationDisplay } from "./validation-display-context";

interface SurveyNavigationProps {
  /** Called when Next is pressed on the final engine screen. */
  onComplete?: () => void;
}

export function SurveyNavigation({ onComplete }: SurveyNavigationProps) {
  const { canGoNext, canGoPrevious, goNext, goPrevious } = useSurveyNavigation();
  const { valid } = useSurveyValidation();
  const { markAttempted } = useValidationDisplay();
  const completingRef = useRef(false);

  function handleNext() {
    if (!valid) {
      markAttempted();
      return;
    }
    if (canGoNext) {
      goNext();
      return;
    }
    if (completingRef.current) return;
    completingRef.current = true;
    onComplete?.();
  }

  return (
    <div className="flex items-center justify-between gap-3 pt-2">
      {canGoPrevious ? (
        <Button variant="ghost" onClick={goPrevious} aria-label="Previous">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          <span className="ml-2">Back</span>
        </Button>
      ) : (
        <span />
      )}

      <Button
        variant="primary"
        onClick={handleNext}
        disabled={!valid}
        aria-label={canGoNext ? "Next" : "Continue"}
      >
        <span className="mr-2">{canGoNext ? "Next" : "Continue"}</span>
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Button>
    </div>
  );
}