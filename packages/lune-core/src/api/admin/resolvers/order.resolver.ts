import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import {
  CommonFulfillmentFieldResolver,
  CommonFulfillmentLineFieldResolver
} from '@/api/shared/resolvers/fulfillment-field.resolver';
import { CommonOrderFieldResolver } from '@/api/shared/resolvers/order-field.resolver';
import type {
  MutationAddFulfillmentToOrderArgs,
  MutationCancelOrderArgs,
  MutationMarkOrderAsCompletedArgs,
  MutationMarkOrderAsProcessingArgs,
  QueryOrderArgs,
  QueryOrdersArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { OrderService } from '@/business/order/order.service';
import { FulfillmentState } from '@/persistence/entities/fulfillment';
import { type Order, OrderState } from '@/persistence/entities/order';
import { isErrorResult } from '@/utils/error-result';

async function orders(_: unknown, { input }: QueryOrdersArgs, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  const [orders, total] = await Promise.all([
    orderService.find(input ?? {}),
    orderService.count(input?.filters)
  ]);

  return new ListResponse(orders, orders.length, { total });
}

async function order(_: unknown, input: QueryOrderArgs, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  return orderService.findUnique(clean(input));
}

async function markOrderAsProcessing(
  _: unknown,
  input: MutationMarkOrderAsProcessingArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.markAsProcessing(input.id);

  return isErrorResult(result)
    ? { apiErrors: [result], order: null }
    : { apiErrors: [], order: result };
}

// async function markOrderAsShipped(
//   _,
//   { id, input }: MutationMarkOrderAsShippedArgs,
//   ctx: ExecutionContext
// ) {
//   const orderService = new OrderService(ctx);

//   const result = await orderService.markAsShipped(id, input);

//   return isErrorResult(result)
//     ? { apiErrors: [result], order: null }
//     : { apiErrors: [], order: result };
// }

// async function markOrderAsReadyForPickup(
//   _,
//   { id }: MutationMarkOrderAsReadyForPickupArgs,
//   ctx: ExecutionContext
// ) {
//   const orderService = new OrderService(ctx);

//   const result = await orderService.markAsReadyForPickup(id);

//   return isErrorResult(result)
//     ? { apiErrors: [result], order: null }
//     : { apiErrors: [], order: result };
// }

// async function markOrderAsDelivered(
//   _,
//   { id }: MutationMarkOrderAsDeliveredArgs,
//   ctx: ExecutionContext
// ) {
//   const orderService = new OrderService(ctx);

//   const result = await orderService.markAsDelivered(id);

//   return isErrorResult(result)
//     ? { apiErrors: [result], order: null }
//     : { apiErrors: [], order: result };
// }

async function addFulfillmentToOrder(
  _: unknown,
  { id, input }: MutationAddFulfillmentToOrderArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.addFulfillment(id, input);

  return isErrorResult(result)
    ? { apiErrors: [result], order: null }
    : { apiErrors: [], order: result };
}

async function markOrderAsCompleted(
  _: unknown,
  { id }: MutationMarkOrderAsCompletedArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.markAsCompleted(id);

  return isErrorResult(result)
    ? { apiErrors: [result], order: null }
    : { apiErrors: [], order: result };
}

async function cancelOrder(
  _: unknown,
  { id, input }: MutationCancelOrderArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.cancel(id, input);

  return isErrorResult(result)
    ? { apiErrors: [result], order: null }
    : { apiErrors: [], order: result };
}

export const OrderResolver: GraphqlApiResolver = {
  Query: {
    orders: UseUserGuard(orders),
    order: UseUserGuard(order)
  },
  Mutation: {
    markOrderAsProcessing: UseUserGuard(markOrderAsProcessing),
    addFulfillmentToOrder: UseUserGuard(addFulfillmentToOrder),
    // markOrderAsShipped: UseUserGuard(markOrderAsShipped),
    // markOrderAsReadyForPickup: UseUserGuard(markOrderAsReadyForPickup),
    // markOrderAsDelivered: UseUserGuard(markOrderAsDelivered),
    markOrderAsCompleted: UseUserGuard(markOrderAsCompleted),
    cancelOrder: UseUserGuard(cancelOrder)
  },
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
  Order: {
    ...CommonOrderFieldResolver,
    cancellation: async (parent: Order, _: unknown, ctx: ExecutionContext) => {
      return ctx.loaders.order.cancellation.load(parent.id);
    }
  },
  Fulfillment: {
    ...CommonFulfillmentFieldResolver
  },
  FulfillmentLine: {
    ...CommonFulfillmentLineFieldResolver
  }
};
