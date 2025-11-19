import type { ID, LuneEntity, LuneTable } from './entity';

export enum FulfillmentType {
  /**
   * Product will be shipped to the customer's address
   */
  SHIPPING = 'SHIPPING',
  /**
   * Customer will pick up the product at a physical store location
   */
  IN_STORE_PICKUP = 'IN_STORE_PICKUP'
}

/**
 * A fulfillment represents how an order will be delivered to the customer
 */
export interface Fulfillment extends LuneEntity {
  /**
   * Type of fulfillment (shipping or in-store pickup)
   */
  type: FulfillmentType;
  /**
   * Fulfillment amount before discounts
   */
  amount: number;
  /**
   * Fulfillment amount after discounts
   */
  total: number;
  /**
   * Order which this fulfillment belongs to
   */
  orderId: ID;
}

export interface FulfillmentTable extends LuneTable {
  type: FulfillmentType;
  amount: number;
  total: number;
  order_id: ID;
  shop_id: string;
}
