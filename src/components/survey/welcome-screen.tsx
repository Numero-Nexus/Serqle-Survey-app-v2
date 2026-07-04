"use client";

import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Dices aria-hidden="true" className="h-10 w-10 text-primary" />
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
          Quick Quiz: How Do You Spend Free Time?
        </h1>
        <p className="text-sm text-muted-foreground">
          Takes ~2–3 minutes. Just tap what feels right — there are no wrong
          answers.
        </p>
      </div>
      <Button variant="primary" onClick={onStart}>
        Let&apos;s go
      </Button>
    </div>
  );
}