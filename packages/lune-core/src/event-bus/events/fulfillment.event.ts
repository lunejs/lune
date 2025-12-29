import type { ID } from '@/persistence/entities/entity';

import type { LuneEventContext } from './lune.event';
import { LuneEvent } from './lune.event';

export const enum FulfillmentEvent {
  Shipped = 'fulfillment.shipped',
  ReadyForPickup = 'fulfillment.ready_for_pickup',
  Delivered = 'fulfillment.delivered'
}

/**
 * @description
 * Event emitted when a fulfillment has been shipped.
 */
export class FulfillmentShippedEvent extends LuneEvent {
  readonly trackingCode: string;
  readonly carrier: string;

  constructor(
    public readonly ctx: LuneEventContext,
    public readonly orderId: ID,
    input: OrderShippedEventInput
  ) {
    super(FulfillmentEvent.Shipped, ctx);
    Object.assign(this, input);
  }
}
type OrderShippedEventInput = { trackingCode: string; carrier: string };

/**
 * @description
 * Event emitted when a fulfillment is ready for in-store pickup.
 */
export class FulfillmentReadyForPickupEvent extends LuneEvent {
  constructor(
    public readonly ctx: LuneEventContext,
    public readonly orderId: ID
  ) {
    super(FulfillmentEvent.ReadyForPickup, ctx);
  }
}

/**
 * @description
 * Event emitted when a fulfillment has been delivered to the customer.
 */
export class FulfillmentDeliveredEvent extends LuneEvent {
  constructor(
    public readonly ctx: LuneEventContext,
    public readonly orderId: ID
  ) {
    super(FulfillmentEvent.Delivered, ctx);
  }
}
