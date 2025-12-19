import { LunePlugin } from '@lune/core';
import { EmailSender } from './senders/sender';
import { OrderListener } from './listeners/order.listener';
import { EmailPluginConfig } from './email-plugin.types';

export class EmailPlugin extends LunePlugin {
  constructor(config: EmailPluginConfig) {
    const orderListener = new OrderListener(config);

    super({
      register(_app, database) {
        orderListener
          .init(database)
          .registerOnOrderPlacedListener()
          .registerOnOrderShippedListener()
          .registerOnOrderReadyForPickupListener()
          .registerOnOrderDeliveredListener();
      },
    });
  }
}
