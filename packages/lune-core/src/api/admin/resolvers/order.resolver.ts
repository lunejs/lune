import { clean } from '@lunejs/common';

import { UseUserGuard } from '@/api/admin/guards/user.guard';
import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { DeliveryMethodDetailsUnionResolver } from '@/api/shared/resolvers/delivery-method-details.resolver';
import { CommonDeliveryMethodFieldResolver } from '@/api/shared/resolvers/delivery-method-field.resolver';
import { CommonDeliveryMethodPickupFieldResolver } from '@/api/shared/resolvers/delivery-method-pickup-field.resolver';
import { CommonDeliveryMethodShippingFieldResolver } from '@/api/shared/resolvers/delivery-method-shipping-field.resolver';
import {
  CommonFulfillmentFieldResolver,
  CommonFulfillmentLineFieldResolver
} from '@/api/shared/resolvers/fulfillment-field.resolver';
import { CommonOrderFieldResolver } from '@/api/shared/resolvers/order-field.resolver';
import { CommonOrderLineFieldResolver } from '@/api/shared/resolvers/order-line-field.resolver';
import type {
  MutationAddFulfillmentToOrderArgs,
  MutationCancelOrderArgs,
  MutationMarkFulfillmentAsDeliveredArgs,
  MutationMarkFulfillmentAsPickedUpArgs,
  MutationMarkFulfillmentAsReadyForPickupArgs,
  MutationMarkFulfillmentAsShippedArgs,
  MutationMarkOrderAsCompletedArgs,
  MutationMarkOrderAsProcessingArgs,
  QueryOrderArgs,
  QueryOrdersArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { OrderService } from '@/business/order/order.service';
import { type Order } from '@/persistence/entities/order';
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

async function markFulfillmentAsShipped(
  _: unknown,
  { fulfillmentId, input }: MutationMarkFulfillmentAsShippedArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.markFulfillmentAsShipped(fulfillmentId, input);

  return isErrorResult(result)
    ? { apiErrors: [result], order: null }
    : { apiErrors: [], order: result };
}

async function markFulfillmentAsDelivered(
  _: unknown,
  { fulfillmentId }: MutationMarkFulfillmentAsDeliveredArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.markFulfillmentAsDelivered(fulfillmentId);

  return isErrorResult(result)
    ? { apiErrors: [result], order: null }
    : { apiErrors: [], order: result };
}

async function markFulfillmentAsReadyForPickup(
  _: unknown,
  { fulfillmentId }: MutationMarkFulfillmentAsReadyForPickupArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.markFulfillmentAsReadyForPickup(fulfillmentId);

  return isErrorResult(result)
    ? { apiErrors: [result], order: null }
    : { apiErrors: [], order: result };
}

async function markFulfillmentAsPickedUp(
  _: unknown,
  { fulfillmentId }: MutationMarkFulfillmentAsPickedUpArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.markFulfillmentAsPickedUp(fulfillmentId);

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
    markFulfillmentAsShipped: UseUserGuard(markFulfillmentAsShipped),
    markFulfillmentAsDelivered: UseUserGuard(markFulfillmentAsDelivered),
    markFulfillmentAsReadyForPickup: UseUserGuard(markFulfillmentAsReadyForPickup),
    markFulfillmentAsPickedUp: UseUserGuard(markFulfillmentAsPickedUp),
    markOrderAsCompleted: UseUserGuard(markOrderAsCompleted),
    cancelOrder: UseUserGuard(cancelOrder)
  },
  Order: {
    ...CommonOrderFieldResolver,
    cancellation: async (parent: Order, _: unknown, ctx: ExecutionContext) => {
      return ctx.loaders.order.cancellation.load(parent.id);
    }
  },
  OrderLine: {
    ...CommonOrderLineFieldResolver
  },
  Fulfillment: {
    ...CommonFulfillmentFieldResolver
  },
  FulfillmentLine: {
    ...CommonFulfillmentLineFieldResolver
  },
  DeliveryMethodDetails: DeliveryMethodDetailsUnionResolver,
  DeliveryMethod: {
    ...CommonDeliveryMethodFieldResolver
  },
  DeliveryMethodShipping: {
    ...CommonDeliveryMethodShippingFieldResolver
  },
  DeliveryMethodPickup: {
    ...CommonDeliveryMethodPickupFieldResolver
  }
};
