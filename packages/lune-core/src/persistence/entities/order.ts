import type { LuneEntity, LuneTable } from './entity';

export enum OrderState {
  /**
   * The order is being modified by the customer
   */
  MODIFYING = 'MODIFYING',
  /**
   * A payment has been added to the order and cannot be modified anymore
   */
  PLACED = 'PLACED',
  /**
   * Order is being processed for shipment
   */
  PROCESSING = 'PROCESSING',
  /**
   * Order has been shipped via the carrier
   */
  SHIPPED = 'SHIPPED',
  /**
   * Order has been delivered to the customer
   */
  DELIVERED = 'DELIVERED',
  /**
   * Order is ready for pick up at the location chosen by the customer
   */
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  /**
   * Order is completed (delivered and fully paid)
   */
  COMPLETED = 'COMPLETED',
  /**
   * Order has been cancelled
   */
  CANCELED = 'CANCELED'
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
   * The price that will be sent to the payment provider. subtotal + shipping price
   */
  total: number;
  /**
   * Order lines total less discounts
   */
  subtotal: number;
  /**
   * The date and time when the order has been marked as placed
   */
  placedAt?: Date | null;
  /**
   * The date and time when the order has been marked as completed (delivered and paid)
   */
  completedAt?: Date | null;
  /**
   * Total quantity of items across all order lines
   */
  totalQuantity: number;
  /**
   * Shipping address where the order has to be delivered
   */
  shippingAddress?: any | null;
  /**
   * Customer who placed the order. Nullable for guest orders
   */
  customerId?: string | null;
}

export interface OrderTable extends LuneTable {
  code?: string | null;
  state: OrderState;
  total: number;
  subtotal: number;
  total_quantity: number;
  placed_at?: Date | null;
  completed_at?: Date | null;
  shipping_address?: any | null;
  customer_id?: string | null;
  shop_id: string;
}
