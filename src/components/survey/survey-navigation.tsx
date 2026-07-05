"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSurveyNavigation } from "@/hooks/use-survey-navigation";
import { useSurveyValidation } from "@/hooks/use-survey-validation";
import { useValidationDisplay } from "./validation-display-context";
import { useSurvey } from "@/hooks/use-survey";
import { surveyEventBus } from "@/research/bus/event-bus";
import { createSurveyEvent } from "@/research/events/factory";

const PRODUCER = { name: "survey-ui", version: "1.0.0" };
const VERSIONS = {
  eventVersion: "1.0.0",
  schemaVersion: "1.0.0",
  surveyVersion: "free-time-fast-choices-v3",
  featureVersion: "unversioned",
  rewardVersion: "unversioned",
};

interface SurveyNavigationProps {
  /** Called when Next is pressed on the final engine screen. */
  onComplete?: () => void;
}

export function SurveyNavigation({ onComplete }: SurveyNavigationProps) {
  const { canGoNext, canGoPrevious, goNext, goPrevious } = useSurveyNavigation();
  const { valid, errors } = useSurveyValidation();
  const { markAttempted } = useValidationDisplay();
  const { state } = useSurvey();
  const completingRef = useRef(false);
  const surveyStartedAt = useRef(0);

  useEffect(() => {
    surveyStartedAt.current = Date.now();
  }, []);

  function handleNext() {
    const currentScreen = state.survey.screens[state.currentScreenIndex];
    const screenId = currentScreen?.id ?? "unknown";

    if (!valid) {
      markAttempted();
      surveyEventBus.publish(
        "validation_failed",
        createSurveyEvent({
          category: "validation",
          type: "validation_failed",
          producer: PRODUCER,
          source: screenId,
          versions: VERSIONS,
          payload: { screenId, failedQuestionIds: Object.keys(errors) },
        })
      );
      return;
    }

    surveyEventBus.publish(
      "validation_passed",
      createSurveyEvent({
        category: "validation",
        type: "validation_passed",
        producer: PRODUCER,
        source: screenId,
        versions: VERSIONS,
        payload: { screenId },
      })
    );

    if (canGoNext) {
      goNext();
      return;
    }
    if (completingRef.current) return;
    completingRef.current = true;

    surveyEventBus.publish(
      "survey_submitted",
      createSurveyEvent({
        category: "submission",
        type: "survey_submitted",
        producer: PRODUCER,
        source: screenId,
        versions: VERSIONS,
        payload: {
          totalScreens: state.survey.screens.length,
          totalQuestions: state.survey.screens.reduce(
            (sum, s) => sum + s.questions.length,
            0
          ),
        },
      })
    );
    surveyEventBus.publish(
      "session_completed",
      createSurveyEvent({
        category: "lifecycle",
        type: "session_completed",
        producer: PRODUCER,
        source: screenId,
        versions: VERSIONS,
        payload: { totalDurationMs: Date.now() - surveyStartedAt.current },
      })
    );

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