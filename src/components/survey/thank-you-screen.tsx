"use client";

import { useState } from "react";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_LENGTH = 100;

interface ThankYouScreenProps {
  onDone: (optionalFeedback: string | null) => void;
}

export function ThankYouScreen({ onDone }: ThankYouScreenProps) {
  const [feedback, setFeedback] = useState("");
  const [skipped, setSkipped] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <PartyPopper aria-hidden="true" className="h-10 w-10 text-primary" />
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
          That&apos;s a wrap!
        </h1>
        <p className="text-sm text-muted-foreground">
          Thanks for playing along. This was part of a short behavioural
          research study on everyday decision-making — your answers help us
          understand how people choose how to spend their time. No personal
          data is shared, and you can request your responses be deleted any
          time.
        </p>
      </div>

      {!skipped && !submitted && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="optional-feedback"
            className="text-sm font-medium text-foreground"
          >
            If you could instantly make one part of your weekends more
            enjoyable, what would it be?{" "}
            <span className="text-muted-foreground font-normal">
              (optional, one short sentence)
            </span>
          </label>
          <input
            id="optional-feedback"
            type="text"
            maxLength={MAX_LENGTH}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={cn(
              "min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            )}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {feedback.length}/{MAX_LENGTH}
            </span>
            <button
              type="button"
              onClick={() => setSkipped(true)}
              className="text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {submitted ? (
        <p className="text-sm text-center text-muted-foreground" role="status">
          Thanks — your response has been recorded.
        </p>
      ) : (
        <Button
          variant="primary"
          onClick={() => {
            setSubmitted(true);
            onDone(skipped || feedback.trim() === "" ? null : feedback.trim());
          }}
        >
          Done
        </Button>
      )}
    </div>
  );
}