/** A single email send request, independent of any specific provider. */
export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/** Result of a send attempt, normalized across providers. */
export type EmailSendResult =
  | { success: true; providerMessageId: string }
  | { success: false; error: string };

/**
 * Provider abstraction — the rest of the application depends only on this
 * interface, never on a specific vendor (Brevo, SES, SendGrid, Resend...).
 */
export interface EmailProvider {
  send(message: EmailMessage): Promise<EmailSendResult>;
}

/** Identifies which reusable template/email type is being sent. */
export type EmailType = "thank-you";