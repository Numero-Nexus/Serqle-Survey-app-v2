import { contactRepository } from "@/db/repository";
import { BrevoEmailProvider } from "./providers/brevo-provider";
import { buildThankYouEmail } from "./templates/thank-you";
import type { EmailProvider } from "./types";

const provider: EmailProvider = new BrevoEmailProvider();

/**
 * Reusable communication service. Business logic should call only these
 * functions — never a provider or template directly. Future email types
 * (research invitations, product updates, reminders) get their own
 * exported function here, following the same idempotency + logging pattern.
 */
export async function sendThankYouEmail(contactId: string): Promise<void> {
  const contact = await contactRepository.findById(contactId);

  if (!contact) {
    console.error("[email] thank-you send skipped: contact not found", contactId);
    return;
  }

  if (contact.consent !== "true") {
    console.log("[email] thank-you send skipped: no consent", contactId);
    return;
  }

  if (contact.thankYouEmailStatus !== "pending") {
    console.log("[email] thank-you send skipped: duplicate", {
      contactId,
      status: contact.thankYouEmailStatus,
    });
    return;
  }

  console.log("[email] thank-you queued", contactId);

  const message = buildThankYouEmail(contact.email);
  const result = await provider.send(message);

  if (result.success) {
    await contactRepository.updateThankYouStatus(contactId, "sent", new Date());
    console.log("[email] thank-you sent", { contactId, providerMessageId: result.providerMessageId });
  } else {
    await contactRepository.updateThankYouStatus(contactId, "failed", null);
    console.error("[email] thank-you failed", { contactId, error: result.error });
  }
}