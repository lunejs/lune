import type { ID } from './entity';

/**
 * Tracks discount usage per customer, creating a record each time a customer successfully uses a discount.
 */
export interface DiscountUsage {
  /** Date and time when this discount was used */
  appliedAt: Date;
  /** The discount that was used */
  discountId: ID;
  /** The customer who used the discount */
  customerId: ID;
}

export interface DiscountUsageTable {
  applied_at: Date;
  discount_id: ID;
  customer_id: ID;
  shop_id: ID;
}
