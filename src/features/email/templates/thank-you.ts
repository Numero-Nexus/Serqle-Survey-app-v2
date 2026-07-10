import type { EmailMessage } from "../types";

/**
 * Thank You email — acknowledgement only. Never includes survey answers,
 * behaviour vector, Soul Code, Soul Archetype, or any inference output.
 */
export function buildThankYouEmail(to: string): EmailMessage {
  const subject = "Thank you for contributing to our behavioural research";

  const text = `Thank you for your participation.

We wanted to take a moment to acknowledge your contribution to our ongoing behavioural research. Studies like this depend entirely on people willing to give a few honest minutes of their time, and that's exactly what you did.

Your response has been recorded as part of a broader effort to understand how people make everyday decisions. It will be treated with care, and combined only with other anonymous responses for research purposes.

You're receiving this note because you chose to share your email and opted in to hear from us. Any future emails are entirely optional — this message is simply a confirmation that your participation was received and appreciated.

If you have any questions at any point, we're glad to hear from you.

With thanks,
The Research Team

—
This is a one-time confirmation email related to a research study you took part in.
Questions? Contact us at ${"research@" + "example.com"}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1f2933; line-height: 1.6;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 32px 0;">
        <tr>
          <td>
            <p style="font-size: 16px; font-weight: 600; margin: 0 0 20px;">
              Thank you for your participation.
            </p>

            <p style="font-size: 14px; margin: 0 0 16px;">
              We wanted to take a moment to acknowledge your contribution to our
              ongoing behavioural research. Studies like this depend entirely on
              people willing to give a few honest minutes of their time, and
              that's exactly what you did.
            </p>

            <p style="font-size: 14px; margin: 0 0 16px;">
              Your response has been recorded as part of a broader effort to
              understand how people make everyday decisions. It will be treated
              with care, and combined only with other anonymous responses for
              research purposes.
            </p>

            <p style="font-size: 14px; margin: 0 0 16px;">
              You're receiving this note because you chose to share your email
              and opted in to hear from us. Any future emails are entirely
              optional — this message is simply a confirmation that your
              participation was received and appreciated.
            </p>

            <p style="font-size: 14px; margin: 0 0 24px;">
              If you have any questions at any point, we're glad to hear from you.
            </p>

            <p style="font-size: 14px; margin: 0;">
              With thanks,<br />
              The Research Team
            </p>
          </td>
        </tr>
        <tr>
          <td style="border-top: 1px solid #e4e7eb; padding-top: 16px; margin-top: 32px;">
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 4px;">
              This is a one-time confirmation email related to a research study you took part in.
            </p>
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
              Questions? Contact us at
              <a href="mailto:research@example.com" style="color: #6b7280;">research@example.com</a>
            </p>
          </td>
        </tr>
      </table>
    </div>
  `.trim();

  return { to, subject, html, text };
}