import type { EmailSender } from './senders/sender';

export type EmailPluginConfig =
  | { devMode: true }
  | {
      devMode?: false;
      sender: EmailSender;
    };
