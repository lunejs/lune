import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Represents shipping fulfillment details for an order
 */
export interface ShippingFulfillment extends LuneEntity {
  /**
   * The shipping method used to generate this fulfillment
   */
  method: string;
  /**
   * Tracking code provided by the carrier
   */
  trackingCode?: string | null;
  /**
   * Name of the shipping carrier
   */
  carrier?: string | null;
  /**
   * Date and time when the order was shipped
   */
  shippedAt?: Date | null;
  /**
   * Date and time when the order was delivered
   */
  deliveredAt?: Date | null;
  /**
   * The fulfillment this shipping belongs to
   */
  fulfillmentId: ID;
  /**
   * The shipping method id used to generate this fulfillment
   */
  shippingMethodId: ID;
}

export interface ShippingFulfillmentTable extends LuneTable {
  method: string;
  tracking_code?: string | null;
  carrier?: string | null;
  shipped_at?: Date | null;
  delivered_at?: Date | null;
  fulfillment_id: ID;
  shipping_method_id: ID;
  shop_id: string;
}
