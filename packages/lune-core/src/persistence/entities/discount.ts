import type { HandlerConfig, ID, LuneEntity, LuneTable } from './entity';

/**
 * Defines how the discount is applied to the customer
 */
export enum ApplicationMode {
  /** Discount requires a code to be entered by the customer */
  Code = 'CODE',
  /** Discount is automatically applied when conditions are met */
  Automatic = 'AUTOMATIC'
}

/**
 * Defines at which level the discount is applied
 */
export enum ApplicationLevel {
  /** Discount applied to the order subtotal */
  Order = 'ORDER',
  /** Discount applied to specific order lines */
  OrderLine = 'ORDER_LINE',
  /** Discount applied to fulfillment amount */
  Fulfillment = 'FULFILLMENT'
}

/**
 * Represents a discount that has been applied to an order, order line, or fulfillment.
 */
export type AppliedDiscount = Pick<Discount, 'code' | 'applicationMode' | 'applicationLevel'> & {
  /** The amount discounted */
  discountedAmount: number;
};

/**
 * A discount is a way to apply price discounts to your customer orders via a code or automatic rules.
 */
export interface Discount extends LuneEntity {
  deletedAt?: Date | null;
  /**
   * The discount coupon code.
   * For automatic discount this will work as a discount name
   */
  code: string;
  /** How the discount is applied to the order */
  applicationMode: ApplicationMode;
  /** At what order level the discount is applied */
  applicationLevel: ApplicationLevel;
  /** Maximum times a customer can use this discount (null = unlimited) */
  perCustomerLimit?: number | null;
  /** Date when the discount starts to be applicable */
  startsAt: Date;
  /** Date when the discount stops to be applicable (null = never expires) */
  endsAt?: Date | null;
  /**  Whether the discount is enabled or not. Disabled discounts can't be applied to orders */
  enabled: boolean;
  /** Whether this discount can be combined with other discounts */
  combinable: boolean;
  /** JSONB configuration of discount actions */
  handler: HandlerConfig;
}

export interface DiscountTable extends LuneTable {
  deleted_at?: Date | null;
  code: string;
  application_mode: ApplicationMode;
  application_level: ApplicationLevel;
  per_customer_limit?: number | null;
  starts_at: Date;
  ends_at?: Date | null;
  enabled: boolean;
  combinable: boolean;
  handler: any;
  shop_id: ID;
}
