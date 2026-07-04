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

registerSurveyQuestions();

type Phase = "welcome" | "survey" | "done";

export function SurveyFlow() {
  const [phase, setPhase] = useState<Phase>("welcome");

  return (
    <main className="flex-1 py-8 sm:py-12">
      <Container>
        <Card className="flex flex-col gap-6 max-w-md mx-auto">
          {phase === "welcome" && (
            <WelcomeScreen onStart={() => setPhase("survey")} />
          )}

          {phase === "survey" && (
            <SurveyProvider survey={freeTimeSurvey}>
              <SurveyProgressIndicator />
              <SurveyRenderer />
              <SurveyNavigation onComplete={() => setPhase("done")} />
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