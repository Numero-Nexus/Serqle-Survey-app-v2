import { env } from "@/config/env";
import type { EmailMessage, EmailProvider, EmailSendResult } from "../types";

const BREVO_SEND_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

/**
 * Brevo Transactional Email API implementation of EmailProvider. This is
 * the ONLY file in the codebase that knows about Brevo's request/response
 * shape — swapping providers means writing a new file here, nothing else.
 */
export class BrevoEmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const response = await fetch(BREVO_SEND_ENDPOINT, {
        method: "POST",
        headers: {
          "api-key": env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { email: env.EMAIL_FROM, name: env.EMAIL_FROM_NAME },
          to: [{ email: message.to }],
          subject: message.subject,
          htmlContent: message.html,
          textContent: message.text,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        return { success: false, error: `Brevo API error (${response.status}): ${body}` };
      }

      const data = (await response.json()) as { messageId?: string };
      return { success: true, providerMessageId: data.messageId ?? "unknown" };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown Brevo send error",
      };
    }
  }
}