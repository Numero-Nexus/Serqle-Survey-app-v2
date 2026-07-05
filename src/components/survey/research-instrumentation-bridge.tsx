"use client";

import { useEffect } from "react";
import { useResearchInstrumentation } from "@/research/instrumentation/use-research-instrumentation";
import { researchCollector } from "@/research/instrumentation/collector";
import { surveyEventBus } from "@/research/bus/event-bus";
import { persistEventAction } from "@/db/actions";
import { getParticipantId, getSessionId } from "@/research/instrumentation/session-identity";
import type { PersistenceProvenance } from "@/db/provenance";

/**
 * Bridges the survey engine to research instrumentation. Rendered inside
 * SurveyProvider so it can observe engine state; has no visual output.
 */
export function ResearchInstrumentationBridge() {
  useEffect(() => {
    researchCollector.start();
    return () => researchCollector.stop();
  }, []);

  useEffect(() => {
    const provenance: PersistenceProvenance = {
      participantId: getParticipantId(),
      sessionId: getSessionId(),
      instrumentVersion: "1.0.0",
      uiVersion: "1.0.0",
      clientVersion: "1.0.0",
      buildIdentifier: process.env.NEXT_PUBLIC_APP_URL ?? "local-dev",
      deviceCategory:
        typeof window === "undefined"
          ? "unknown"
          : window.innerWidth < 640
          ? "mobile"
          : window.innerWidth < 1024
          ? "tablet"
          : "desktop",
      locale: typeof navigator === "undefined" ? "en-US" : navigator.language,
      timezone:
        typeof Intl === "undefined"
          ? "UTC"
          : Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const unsubscribe = surveyEventBus.subscribeAll((event) => {
      void persistEventAction(event, provenance).then((result) => {
        if (!result.success) {
          console.error("[research] failed to persist event:", result.error);
        }
      });
    });

    return unsubscribe;
  }, []);

  useResearchInstrumentation();

  return null;
}