import { LunePlugin } from '@lune/core';
import { EmailSender } from './senders/sender';
import { OrderListener } from './listeners/order.listener';

export class EmailPlugin extends LunePlugin {
  constructor(private readonly config: Config) {
    const orderListener = new OrderListener(config.sender);

    super({
      register(app) {
        orderListener.onOrderPlaced();
      },
    });
  }
}

type Config = {
  sender: EmailSender;
};
