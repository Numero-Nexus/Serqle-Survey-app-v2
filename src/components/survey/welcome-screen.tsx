"use client";

// import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dices, Clock, Brain, Lock, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Dices aria-hidden="true" className="h-10 w-10 text-primary" />
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
          Everyone Spends Their Arvo Off Differently
        </h1>
        <p className="text-sm text-muted-foreground">
          Netflix, a walk on the beach, footy with mates - whatever it is,
          we&apos;re keen to understand how people naturally make everyday
          leisure decisions. This short survey is part of a behavioural
          research study looking at those everyday choices - there&apos;s no
          catch, just a few quick questions.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        <Card className="flex flex-col items-center gap-1 p-3 text-center">
          <Clock aria-hidden="true" className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Around 3 minutes</span>
        </Card>
        <Card className="flex flex-col items-center gap-1 p-3 text-center">
          <Brain aria-hidden="true" className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">No right or wrong answers</span>
        </Card>
        <Card className="flex flex-col items-center gap-1 p-3 text-center">
          <Lock aria-hidden="true" className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Anonymous unless you share your email later</span>
        </Card>
        <Card className="flex flex-col items-center gap-1 p-3 text-center">
          <Smartphone aria-hidden="true" className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Works best on mobile or desktop</span>
        </Card>
      </div>
        <p className="text-xs text-muted-foreground italic max-w-sm">
          Go with your first instinct — we&apos;re interested in how people
          naturally make decisions, not overthinking it.
        </p>
      <Button variant="primary" onClick={onStart}>
        Start Survey
      </Button>
      <p className="text-xs text-muted-foreground/70 max-w-sm">
        By continuing, you agree to participate in this voluntary
        behavioural research study.
      </p>
    </div>
  );
}