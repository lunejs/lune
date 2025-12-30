import { LuneLogger } from '@lunejs/common';
import { LunePlugin } from '@lunejs/core';

import { OrderListener } from './listeners/order.listener';
import type { EmailPluginConfig } from './email-plugin.types';

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

        LuneLogger.info('email plugin initialized');
      }
    });
  }
}
