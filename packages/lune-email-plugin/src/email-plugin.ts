import { LunePlugin } from '@lune/core';
import { EmailSender } from './senders/sender';
import { OrderListener } from './listeners/order.listener';

export class EmailPlugin extends LunePlugin {
  constructor(config: Config) {
    const orderListener = new OrderListener(config.sender);

    super({
      register(_app, database) {
        orderListener.init(database).registerOnOrderPlacedListener();
      },
    });
  }
}

type Config = {
  sender: EmailSender;
};
