import type { ID, LuneEntity, LuneTable } from './entity';

export enum DeliveryMethodType {
  /**
   * Product will be delivered to the customer's address
   */
  Shipping = 'SHIPPING',
  /**
   * Customer will pick up the product at a physical store location
   */
  Pickup = 'PICKUP'
}

/**
 * A delivery method represents how an order will be delivered to the customer
 */
export interface DeliveryMethod extends LuneEntity {
  /**
   * Type of the delivery method (shipping or pickup)
   */
  type: DeliveryMethodType;
  /**
   * Delivery method amount before discounts
   */
  amount: number;
  /**
   * Delivery method amount after discounts
   */
  total: number;
  /**
   * Order which this Delivery method belongs to
   */
  orderId: ID;
}

export interface DeliveryMethodTable extends LuneTable {
  type: DeliveryMethodType;
  amount: number;
  total: number;
  order_id: ID;
  shop_id: string;
}
