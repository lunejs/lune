import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Represents shipping fulfillment details for an order
 */
export interface ShippingFulfillment extends LuneEntity {
  /**
   * Tracking code provided by the carrier
   */
  trackingCode: string;
  /**
   * Name of the shipping carrier
   */
  carrier: string;
  /**
   * Date and time when the order was shipped
   */
  shippedAt: Date;
  /**
   * Date and time when the order was delivered
   */
  deliveredAt: Date;
  /**
   * The fulfillment this shipping belongs to
   */
  fulfillmentId: ID;
}

export interface ShippingFulfillmentTable extends LuneTable {
  tracking_code: string;
  carrier: string;
  shipped_at: Date;
  delivered_at: Date;
  fulfillment_id: ID;
  shop_id: string;
}
