"use server";

import { persistEvent } from "./persistence-service";
import type { PersistenceProvenance } from "./provenance";
import { z } from "zod";
import { contactRepository } from "./repository";
import { sendThankYouEmail } from "@/features/email/communication-service";

/**
 * Server Action bridging client-side instrumentation to the server-only
 * Canonical Event Store. This is the ONLY point where event data crosses
 * from the browser to the database — the client never imports `pg` or
 * Drizzle directly.
 */
export async function persistEventAction(
  event: unknown,
  provenance: PersistenceProvenance
): Promise<{ success: boolean; error?: string }> {
  try {
    await persistEvent(event, provenance);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown persistence error",
    };
  }
}

const contactSubmissionSchema = z.object({
  participantId: z.string().min(1),
  email: z.string().email(),
  consent: z.boolean(),
});

/**
 * Server Action for persisting an optional participant contact record.
 * Fully separate from event persistence — never touches canonicalEvents.
 * Failure here must never affect survey/dataset completion; callers treat
 * a `success: false` result as non-fatal.
 *
 * On successful insert with consent, triggers the Thank You email
 * fire-and-forget — this action never awaits email delivery.
 */
export async function persistContactAction(
  input: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = contactSubmissionSchema.parse(input);
    const inserted = await contactRepository.insertOne({
      participantId: parsed.participantId,
      email: parsed.email,
      consent: parsed.consent ? "true" : "false",
      createdAt: new Date(),
    });

    if (parsed.consent) {
      // Fire-and-forget: survey/contact persistence must never wait on
      // email delivery. Errors are handled and logged inside the service.
      void sendThankYouEmail(inserted.id).catch((error) => {
        console.error("[email] unexpected thank-you dispatch error", error);
      });
    }

    return { success: true };
  } catch (error) {
    console.error("[contact] persistence failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown contact persistence error",
    };
  }
}