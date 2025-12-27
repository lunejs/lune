import type { ID, LuneEntity, LuneTable } from './entity';

export const enum FulfillmentState {
  /**
   * The default state a fulfillment is created, indicates the fulfillment has been created
   */
  Pending = 'pending',
  /**
   * The fulfillment has been shipped via the carrier
   */
  Shipped = 'shipped',
  /**
   * Items are ready for being picked up
   */
  ReadyForPickup = 'ready_for_pickup',
  /**
   * Items has been delivered to the customer
   */
  Delivered = 'delivered',
  /**
   * Items has been recollected by the customer from the store
   */
  PickedUp = 'picked_up',
  /**
   * Fulfillment has been canceled
   */
  Canceled = 'canceled'
}

/**
 * A fulfillment represents the process of preparing and delivering an order to a customer
 */
export interface Fulfillment extends LuneEntity {
  /**
   * Current state of the fulfillment
   */
  state: FulfillmentState;
  /**
   * Additional metadata for the fulfillment (tracking info, carrier details, etc.)
   */
  metadata?: ShippingFulfillmentMetadata | PickupFulfillmentMetadata | null;
  /**
   * Order this fulfillment belongs to
   */
  orderId: ID;
}

export type ShippingFulfillmentMetadata = {
  trackingCode: string | null;
  carrier: string | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
};

export type PickupFulfillmentMetadata = {
  readyAt: Date | null;
  pickedUpAt: Date | null;
};

export interface FulfillmentTable extends LuneTable {
  state: FulfillmentState;
  metadata?: Record<string, unknown> | null;
  order_id: ID;
  shop_id: string;
}
