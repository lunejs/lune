import { FulfillmentState, FulfillmentType } from '@/persistence/entities/fulfillment';
import { OrderState } from '@/persistence/entities/order';

import type { GraphqlApiResolver } from '../../graphql-api';

export const OrderEnumsResolver: GraphqlApiResolver = {
  OrderState: {
    MODIFYING: OrderState.Modifying,
    PLACED: OrderState.Placed,
    PROCESSING: OrderState.Processing,
    PARTIALLY_FULFILLED: OrderState.PartiallyFulfilled,
    FULFILLED: OrderState.Fulfilled,
    COMPLETED: OrderState.Completed,
    CANCELED: OrderState.Canceled
  },
  FulfillmentState: {
    PENDING: FulfillmentState.Pending,
    SHIPPED: FulfillmentState.Shipped,
    READY_FOR_PICKUP: FulfillmentState.ReadyForPickup,
    DELIVERED: FulfillmentState.Delivered,
    PICKED_UP: FulfillmentState.PickedUp,
    CANCELED: FulfillmentState.Canceled
  },
  FulfillmentType: {
    SHIPPING: FulfillmentType.Shipping,
    PICKUP: FulfillmentType.Pickup
  }
};
