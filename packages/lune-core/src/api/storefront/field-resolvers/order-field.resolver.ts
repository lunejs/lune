import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonOrderFieldResolver } from '@/api/shared/resolvers/order-field.resolver';
import { OrderState } from '@/persistence/entities/order';

export const OrderFieldResolver: GraphqlApiResolver = {
  OrderState: {
    MODIFYING: OrderState.Modifying,
    PLACED: OrderState.Placed,
    PROCESSING: OrderState.Processing,
    PARTIALLY_FULFILLED: OrderState.PartiallyFulfilled,
    FULFILLED: OrderState.Fulfilled,
    COMPLETED: OrderState.Completed,
    CANCELED: OrderState.Canceled
  },
  Order: {
    ...CommonOrderFieldResolver
  }
};
