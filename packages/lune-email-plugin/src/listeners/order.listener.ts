import { LuneLogger } from '@lune/common';
import type {
  Database,
  FulfillmentDeliveredEvent,
  FulfillmentReadyForPickupEvent,
  FulfillmentShippedEvent,
  OrderPlacedEvent
} from '@lune/core';
import { eventBus, FulfillmentEvent, OrderEvent } from '@lune/core';

import type { EmailPluginConfig } from '../email-plugin.types';

export class OrderListener {
  private database: Database | undefined;

  constructor(private readonly pluginConfig: EmailPluginConfig) {}

  init(database: Database) {
    this.database = database;

    return this;
  }

  registerOnOrderPlacedListener() {
    eventBus.on(OrderEvent.Placed, async (event: OrderPlacedEvent) => {
      if (this.pluginConfig.devMode) {
        LuneLogger.info(`email sent for order ${event.orderId} (order placed)`);

        return;
      }

      // const order = await this.getOrderForEmail(event.orderId, event);

      // this.sender.send({
      //   from: { email: '', name: '' },
      //   html: await EmailTemplates.orderPlaced({
      //     ...this.transformOrderToEmailProps(order),
      //     shop: '' as unknown as Shop,
      //   }),
      //   subject: '',
      //   to: '',
      // });
    });

    return this;
  }

  registerOnOrderShippedListener() {
    eventBus.on(FulfillmentEvent.Shipped, async (event: FulfillmentShippedEvent) => {
      if (this.pluginConfig.devMode) {
        LuneLogger.info(`email sent for order ${event.orderId} (fulfillment shipped)`);

        return;
      }
    });

    return this;
  }

  registerOnOrderReadyForPickupListener() {
    eventBus.on(FulfillmentEvent.ReadyForPickup, async (event: FulfillmentReadyForPickupEvent) => {
      if (this.pluginConfig.devMode) {
        LuneLogger.info(`email sent for order ${event.orderId} (fulfillment ready for pickup)`);

        return;
      }
    });

    return this;
  }

  registerOnOrderDeliveredListener() {
    eventBus.on(FulfillmentEvent.Delivered, async (event: FulfillmentDeliveredEvent) => {
      if (this.pluginConfig.devMode) {
        LuneLogger.info(`email sent for order ${event.orderId} (fulfillment delivered)`);

        return;
      }
    });

    return this;
  }
}
