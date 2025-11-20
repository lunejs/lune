import type { AppliedDiscount } from './discount';
import type { LuneEntity, LuneTable } from './entity';

export enum OrderState {
  /**
   * The order is being modified by the customer
   */
  Modifying = 'MODIFYING',
  /**
   * A payment has been added to the order and cannot be modified anymore
   */
  Placed = 'PLACED',
  /**
   * Order is being processed for shipment
   */
  Processing = 'PROCESSING',
  /**
   * Order has been shipped via the carrier
   */
  Shipped = 'SHIPPED',
  /**
   * Order has been delivered to the customer
   */
  Delivered = 'DELIVERED',
  /**
   * Order is ready for pick up at the location chosen by the customer
   */
  ReadyForPickup = 'READY_FOR_PICKUP',
  /**
   * Order is completed (delivered and fully paid)
   */
  Completed = 'COMPLETED',
  /**
   * Order has been cancelled
   */
  Canceled = 'CANCELED'
}

/**
 * An order represents a customer's purchase, including line items, shipping, and payment information
 */
export interface Order extends LuneEntity {
  /**
   * Unique order code generated after order is placed
   */
  code?: string | null;
  /**
   * Current state of the order
   */
  state: OrderState;
  /**
   * The price that will be sent to the payment provider. (subtotal + fulfillment price)
   */
  total: number;
  /**
   * Order lines total less discounts
   */
  subtotal: number;
  /**
   * Total quantity of items across all order lines
   */
  totalQuantity: number;
  /**
   * Array of all order-level and fulfillment-level discounts applied to the order populated every time order is modified.
   * Use this field to show data of current discounts applied to the order
   */
  appliedDiscounts: AppliedDiscount[];
  /**
   * The date and time when the order has been marked as placed
   */
  placedAt?: Date | null;
  /**
   * The date and time when the order has been marked as completed (delivered and paid)
   */
  completedAt?: Date | null;
  /**
   * Shipping address where the order has to be delivered
   */
  shippingAddress?: OrderAddress | null;
  /**
   * Customer who placed the order. Nullable for guest orders
   */
  customerId?: string | null;
}

export interface OrderAddress {
  /**
   * Full name of the recipient
   */
  fullName: string;
  /**
   * Street address line 1
   */
  streetLine1: string;
  /**
   * Street address line 2 (apartment, suite, etc.)
   */
  streetLine2?: string | null;
  /**
   * Address's city
   */
  city: string;
  /**
   * Postal/ZIP code
   */
  postalCode: string;
  /**
   * Phone number for delivery
   */
  phoneNumber: string;
  /**
   * Additional delivery references or instructions
   */
  references?: string | null;
  /**
   * Address's country
   */
  country: string;
  /**
   * Address's country code
   */
  countryCode: string;
  /**
   * Address's state/province/region
   */
  state: string;
  /**
   * Address's state/province/region code
   */
  stateCode: string;
}

export interface OrderTable extends LuneTable {
  code?: string | null;
  state: OrderState;
  total: number;
  subtotal: number;
  total_quantity: number;
  applied_discounts: string;
  placed_at?: Date | null;
  completed_at?: Date | null;
  shipping_address?: any | null;
  customer_id?: string | null;
  shop_id: string;
}
