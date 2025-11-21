import type { AppliedDiscount } from './discount';
import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Represents a line item in an order
 */
export interface OrderLine extends LuneEntity {
  /** The price of the variant at the time of adding the line, in cents (e.g., 5000 = $50.00) */
  unitPrice: number;
  /** The total price before discounts (unitPrice × quantity), in cents */
  lineSubtotal: number;
  /** The total price after discounts, in cents */
  lineTotal: number;
  /** The quantity of the variant in this line */
  quantity: number;
  /**
   * Array of all order-line-level discounts applied to the order populated every time order is modified.
   * Use this field to show data of current discounts applied to the order-line
   */
  appliedDiscounts: AppliedDiscount[];
  /** The variant (product variant) associated with this line */
  variantId: ID;
  /** The order this line belongs to */
  orderId: ID;
}

export interface OrderLineTable extends LuneTable {
  unit_price: number;
  line_subtotal: number;
  line_total: number;
  quantity: number;
  applied_discounts: string;
  variant_id: ID;
  order_id: ID;
  shop_id: ID;
}
