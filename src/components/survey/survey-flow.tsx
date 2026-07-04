"use client";

import { useState } from "react";
import { SurveyProvider } from "@/engine/context";
import { freeTimeSurvey } from "@/data/survey";
import { Container } from "@/components/ui";
import { Card } from "@/components/ui";
import { WelcomeScreen } from "./welcome-screen";
import { ThankYouScreen } from "./thank-you-screen";
import { SurveyRenderer } from "./survey-renderer";
import { SurveyNavigation } from "./survey-navigation";
import { SurveyProgressIndicator } from "./survey-progress-indicator";
import { registerSurveyQuestions } from "./register-questions";
import { ValidationDisplayProvider } from "./validation-display-context";
import { ResearchInstrumentationBridge } from "./research-instrumentation-bridge";

registerSurveyQuestions();

type Phase = "welcome" | "survey" | "done";

export function SurveyFlow() {
  const [phase, setPhase] = useState<Phase>("welcome");

  return (
    <main className="flex-1 min-h-dvh safe-area-px safe-area-py sm:py-12">
      <Container>
        <Card className="flex flex-col gap-6 max-w-md mx-auto">
          {phase === "welcome" && (
            <WelcomeScreen onStart={() => setPhase("survey")} />
          )}

          {phase === "survey" && (
            <SurveyProvider survey={freeTimeSurvey}>
              <ValidationDisplayProvider>
                <ResearchInstrumentationBridge />
                <SurveyProgressIndicator />
                <SurveyRenderer />
                <SurveyNavigation onComplete={() => setPhase("done")} />
              </ValidationDisplayProvider>
            </SurveyProvider>
          )}

          {phase === "done" && (
            <ThankYouScreen onDone={() => { /* no-op: session ends here for this phase */ }} />
          )}
        </Card>
      </Container>
    </main>
  );
}