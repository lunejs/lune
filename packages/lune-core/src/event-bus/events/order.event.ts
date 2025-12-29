import type { ID } from '@/persistence/entities/entity';

import { LuneEvent, type LuneEventContext } from './lune.event';

export enum OrderEvent {
  Placed = 'order.placed',
  Processed = 'order.processed',
  Completed = 'order.completed',
  Canceled = 'order.canceled'
}

/**
 * @description
 * Event emitted when a payment has been added to an order.
 */
export class OrderPlacedEvent extends LuneEvent {
  constructor(
    public readonly ctx: LuneEventContext,
    public readonly orderId: ID
  ) {
    super(OrderEvent.Placed, ctx);
  }
}

/**
 * @description
 * Event emitted when an order has been marked as processed.
 */
export class OrderProcessedEvent extends LuneEvent {
  constructor(
    public readonly ctx: LuneEventContext,
    public readonly orderId: ID
  ) {
    super(OrderEvent.Processed, ctx);
  }
}

/**
 * @description
 * Event emitted when an order has been marked as completed.
 */
export class OrderCompletedEvent extends LuneEvent {
  constructor(
    public readonly ctx: LuneEventContext,
    public readonly orderId: ID
  ) {
    super(OrderEvent.Completed, ctx);
  }
}

/**
 * @description
 * Event emitted when an order has been canceled.
 */
export class OrderCanceledEvent extends LuneEvent {
  public readonly reason: string;

  constructor(
    public readonly ctx: LuneEventContext,
    public readonly orderId: ID,
    input: OrderCanceledEventInput
  ) {
    super(OrderEvent.Canceled, ctx);
    Object.assign(this, input);
  }
}

type OrderCanceledEventInput = { reason: string };
