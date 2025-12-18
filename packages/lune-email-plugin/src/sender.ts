/**
 * Email sender interface.
 *
 * @description
 * Abstracts the email sending mechanism, allowing different implementations
 * (e.g., Resend, SendGrid, SMTP) to be used interchangeably.
 */
export interface EmailSender {
  /**
   * Sends an email.
   */
  send(email: EmailData): Promise<void>;
}

export type EmailData = {
  /** The sender information. */
  from: {
    /** The sender's email address. */
    email: string;
    /** The sender's display name. */
    name: string;
  };
  /** The recipient's email address. */
  to: string;
  /** The email subject line. */
  subject: string;
  /** The HTML content of the email body. */
  html: string;
};
