import * as nodemailer from 'nodemailer';

import type { EmailData, EmailSender } from '../sender';

/**
 * Nodemailer sender interface.
 *
 * @description
 * Send emails with nodemailer
 */
export class NodemailerSender implements EmailSender {
  private readonly transporter: nodemailer.Transporter;

  constructor(config: NodemailerSenderConfig) {
    this.transporter = nodemailer.createTransport(config);
  }

  async send(email: EmailData): Promise<void> {
    await this.transporter.sendMail({
      from: `${email.from.name} <${email.from.email}>`,
      to: email.to,
      subject: email.subject,
      html: email.html
    });
  }
}

export type NodemailerSenderConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
};
