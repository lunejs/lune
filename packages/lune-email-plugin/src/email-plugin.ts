import { LunePlugin } from '@lune/core';
import { EmailSender } from './senders/sender';

export class EmailPlugin extends LunePlugin {
  constructor(private readonly config: Config) {
    super();
  }
}

type Config = {
  sender: EmailSender;
};
