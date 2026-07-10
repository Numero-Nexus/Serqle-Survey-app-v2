"use client";

import { useState } from "react";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { persistContactAction } from "@/db/actions";
import { getParticipantId } from "@/research/instrumentation/session-identity";

const MAX_LENGTH = 100;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ThankYouScreenProps {
  onDone: (optionalFeedback: string | null) => void;
}

export function ThankYouScreen({ onDone }: ThankYouScreenProps) {
  const [feedback, setFeedback] = useState("");
  const [skipped, setSkipped] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [contactSkipped, setContactSkipped] = useState(false);
  const [contactDone, setContactDone] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const contactStageComplete = contactSkipped || contactDone;

  function validateContact(): boolean {
    setEmailError(null);
    setConsentError(null);

    const trimmedEmail = email.trim();

    if (trimmedEmail === "") {
      // Empty email is always valid — no consent required either.
      return true;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    if (!consent) {
      setConsentError("Please confirm you agree to be contacted.");
      return false;
    }

    return true;
  }

  async function handleContactContinue() {
    if (!validateContact()) return;

    const trimmedEmail = email.trim();
    if (trimmedEmail === "") {
      setContactDone(true);
      return;
    }

    setIsSubmittingContact(true);
    try {
      await persistContactAction({
        participantId: getParticipantId(),
        email: trimmedEmail,
        consent,
      });
    } catch (error) {
      console.error("[contact] submission failed", error);
      // Never block survey completion on contact persistence failure.
    } finally {
      setIsSubmittingContact(false);
      setContactDone(true);
    }
  }

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

      {!contactStageComplete && (
        <div className="flex flex-col gap-3 border-t border-border pt-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold text-foreground">
              Stay Connected (Optional)
            </h2>
            <p className="text-xs text-muted-foreground">
              Interested in learning what comes out of this behavioural study
              or hearing about future research? Leave your email below.
              We&apos;ll only contact you if you choose to hear from us.
            </p>
          </div>

          <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
            Email address{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(null);
            }}
            aria-invalid={emailError !== null}
            aria-describedby={emailError ? "contact-email-error" : undefined}
            className={cn(
              "min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            )}
          />
          {emailError && (
            <p id="contact-email-error" role="alert" className="text-xs text-destructive">
              {emailError}
            </p>
          )}

          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                setConsentError(null);
              }}
              aria-invalid={consentError !== null}
              aria-describedby={consentError ? "contact-consent-error" : undefined}
              className="mt-0.5 h-4 w-4 min-h-0 min-w-0 rounded border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
            I agree to receive occasional updates about this research.
          </label>
          {consentError && (
            <p id="contact-consent-error" role="alert" className="text-xs text-destructive">
              {consentError}
            </p>
          )}

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setContactSkipped(true)}
              className="text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            >
              Skip
            </button>
            <Button
              variant="secondary"
              isLoading={isSubmittingContact}
              onClick={handleContactContinue}
            >
              Continue
            </Button>
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
          disabled={!contactStageComplete}
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