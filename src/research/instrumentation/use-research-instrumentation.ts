"use client";

import { useEffect, useRef } from "react";
import { useSurvey } from "@/hooks/use-survey";
import { surveyEventBus } from "@/research/bus/event-bus";
import { createSurveyEvent } from "@/research/events/factory";
import type { EventVersions, EventProducer } from "@/research/events/types";

const PRODUCER: EventProducer = { name: "survey-ui", version: "1.0.0" };

const VERSIONS: EventVersions = {
  eventVersion: "1.0.0",
  schemaVersion: "1.0.0",
  surveyVersion: "free-time-fast-choices-v3",
  featureVersion: "unversioned",
  rewardVersion: "unversioned",
};

/**
 * Observes survey engine state (read-only) and publishes canonical domain
 * events to the research event bus. This hook depends on the engine; the
 * engine has zero knowledge of this hook's existence, preserving the
 * one-way instrumentation boundary required by this phase.
 */
export function useResearchInstrumentation() {
  const { state } = useSurvey();
  const screenEnteredAt = useRef<number>(0);
  const previousScreenIndex = useRef<number>(state.currentScreenIndex);
  const previousAnswers = useRef(state.answers);
  const hasStarted = useRef(false);


  // session_started — once, on mount
  useEffect(() => {
    screenEnteredAt.current = Date.now();

    if (hasStarted.current) return;
    hasStarted.current = true;

    const deviceType: "mobile" | "tablet" | "desktop" | "unknown" =
      typeof window === "undefined"
        ? "unknown"
        : window.innerWidth < 640
        ? "mobile"
        : window.innerWidth < 1024
        ? "tablet"
        : "desktop";

    surveyEventBus.publish(
      "session_started",
      createSurveyEvent({
        category: "lifecycle",
        type: "session_started",
        producer: PRODUCER,
        source: "survey-flow",
        versions: VERSIONS,
        payload: {
          deviceType,
          viewportWidth: typeof window === "undefined" ? 0 : window.innerWidth,
          viewportHeight: typeof window === "undefined" ? 0 : window.innerHeight,
        },
      })
    );
  }, []);

  // screen_entered / screen_exited — on screen index change
  useEffect(() => {
    const currentScreen = state.survey.screens[state.currentScreenIndex];
    if (!currentScreen) return;

    const previousIndex = previousScreenIndex.current;
    if (previousIndex !== state.currentScreenIndex) {
      const previousScreen = state.survey.screens[previousIndex];
      if (previousScreen) {
        surveyEventBus.publish(
          "screen_exited",
          createSurveyEvent({
            category: "navigation",
            type: "screen_exited",
            producer: PRODUCER,
            source: previousScreen.id,
            versions: VERSIONS,
            payload: {
              screenId: previousScreen.id,
              screenIndex: previousIndex,
              dwellTimeMs: Date.now() - screenEnteredAt.current,
            },
          })
        );
      }
      previousScreenIndex.current = state.currentScreenIndex;
      screenEnteredAt.current = Date.now();
    }

    surveyEventBus.publish(
      "screen_entered",
      createSurveyEvent({
        category: "navigation",
        type: "screen_entered",
        producer: PRODUCER,
        source: currentScreen.id,
        versions: VERSIONS,
        payload: {
          screenId: currentScreen.id,
          screenIndex: state.currentScreenIndex,
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally only re-run on screen index change
  }, [state.currentScreenIndex]);

  // question_answered — on answers map change
  useEffect(() => {
    const currentScreen = state.survey.screens[state.currentScreenIndex];
    if (!currentScreen) return;

    for (const question of currentScreen.questions) {
      const prevValue = previousAnswers.current[question.id];
      const newValue = state.answers[question.id];
      if (prevValue !== newValue && newValue !== undefined) {
        surveyEventBus.publish(
          "question_answered",
          createSurveyEvent({
            category: "interaction",
            type: "question_answered",
            producer: PRODUCER,
            source: currentScreen.id,
            versions: VERSIONS,
            payload: {
              questionId: question.id,
              screenId: currentScreen.id,
              value: newValue,
              timeToAnswerMs: Date.now() - screenEnteredAt.current,
            },
          })
        );
      }
    }
    previousAnswers.current = state.answers;
  }, [state.answers, state.currentScreenIndex, state.survey.screens]);
}