import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Represents a discount that has been applied to an order at checkout.
 */
export interface OrderDiscount extends Omit<LuneEntity, 'updatedAt'> {
  /** The amount discounted in cents */
  discountedAmount: number;
  /** The discount that was used */
  discountId: ID;
  /** The order this discount was applied to */
  orderId: ID;
}

export interface OrderDiscountTable extends Omit<LuneTable, 'updated_at'> {
  discounted_amount: number;
  discount_id: ID;
  order_id: ID;
  shop_id: ID;
}
