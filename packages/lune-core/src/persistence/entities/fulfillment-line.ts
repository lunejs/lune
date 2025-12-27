import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * A fulfillment line represents a specific order line item included in a fulfillment
 */
export interface FulfillmentLine extends LuneEntity {
  /**
   * Quantity of the order line item included in this fulfillment
   */
  quantity: number;
  /**
   * Fulfillment this line belongs to
   */
  fulfillmentId: ID;
  /**
   * Order line this fulfillment line references
   */
  orderLineId: ID;
}

export interface FulfillmentLineTable extends LuneTable {
  quantity: number;
  fulfillment_id: ID;
  order_line_id: ID;
  shop_id: string;
}
