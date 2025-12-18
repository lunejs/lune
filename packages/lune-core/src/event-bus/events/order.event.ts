import type { ID } from '@/persistence/entities/entity';

import { LuneEvent } from './lune.event';

export enum OrderEvent {
  Placed = 'order.placed',
  Processed = 'order.processed',
  Shipped = 'order.shipped',
  ReadyForPickup = 'order.ready-for-pickup',
  Delivered = 'order.delivered',
  Completed = 'order.completed',
  Canceled = 'order.canceled'
}

/**
 * @description
 * Event emitted when a payment has been added to an order.
 */
export class OrderPlacedEvent extends LuneEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.Placed);
  }
}

/**
 * @description
 * Event emitted when an order has been marked as processed.
 */
export class OrderProcessedEvent extends LuneEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.Processed);
  }
}

/**
 * @description
 * Event emitted when an order has been shipped.
 */
export class OrderShippedEvent extends LuneEvent {
  constructor(
    public readonly orderId: ID,
    public readonly trackingCode: string,
    public readonly carrier: string
  ) {
    super(OrderEvent.Shipped);
  }
}

/**
 * @description
 * Event emitted when an order is ready for in-store pickup.
 */
export class OrderReadyForPickupEvent extends LuneEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.ReadyForPickup);
  }
}

/**
 * @description
 * Event emitted when an order has been delivered to the customer.
 */
export class OrderDeliveredEvent extends LuneEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.Delivered);
  }
}

/**
 * @description
 * Event emitted when an order has been marked as completed.
 */
export class OrderCompletedEvent extends LuneEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.Completed);
  }
}

/**
 * @description
 * Event emitted when an order has been canceled.
 */
export class OrderCanceledEvent extends LuneEvent {
  constructor(
    public readonly orderId: ID,
    public readonly reason: string
  ) {
    super(OrderEvent.Canceled);
  }
}
