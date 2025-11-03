import type { LuneEntity, LuneTable } from './entity';

/**
 * An order cancellation records when an order is canceled
 */
export interface OrderCancellation extends LuneEntity {
  /**
   * The reason why the order was canceled
   */
  reason: string;
  /**
   * The order that was canceled
   */
  orderId: string;
}

export interface OrderCancellationTable extends LuneTable {
  reason: string;
  order_id: string;
  shop_id: string;
}
