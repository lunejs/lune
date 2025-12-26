import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import type {
  MutationAddCustomerToOrderArgs,
  MutationAddDeliveryMethodPickupToOrderArgs,
  MutationAddDeliveryMethodShippingToOrderArgs,
  MutationAddDiscountCodeToOrderArgs,
  MutationAddLineToOrderArgs,
  MutationAddPaymentToOrderArgs,
  MutationAddShippingAddressToOrderArgs,
  MutationCreateOrderArgs,
  MutationRemoveOrderLineArgs,
  MutationUpdateOrderLineArgs,
  QueryAvailableShippingMethodsArgs,
  QueryOrderArgs
} from '@/api/shared/types/graphql';
import { OrderService } from '@/business/order/order.service';
import { isErrorResult } from '@/utils/error-result';

async function order(_, input: QueryOrderArgs, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  return orderService.findUnique(clean(input));
}

async function availablePickupLocations(_, __, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  return orderService.findAvailablePickupLocations();
}

async function availablePaymentMethods(_, __, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  return orderService.findAvailablePaymentMethods();
}

async function availableShippingMethods(
  _,
  { orderId }: QueryAvailableShippingMethodsArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  return orderService.findAvailableShippingMethods(orderId);
}

async function createOrder(_, { input }: MutationCreateOrderArgs, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  const result = await orderService.create(input);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

async function addLineToOrder(
  _,
  { orderId, input }: MutationAddLineToOrderArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.addLine(orderId, input);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

async function updateOrderLine(
  _,
  { lineId, input }: MutationUpdateOrderLineArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.updateLine(lineId, input);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

async function removeOrderLine(_, { lineId }: MutationRemoveOrderLineArgs, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  const result = await orderService.removeLine(lineId);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

async function addCustomerToOrder(
  _,
  { orderId, input }: MutationAddCustomerToOrderArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.addCustomer(orderId, input);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

async function addShippingAddressToOrder(
  _,
  { orderId, input }: MutationAddShippingAddressToOrderArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.addShippingAddress(orderId, input);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

async function addDeliveryMethodShippingToOrder(
  _,
  { orderId, input }: MutationAddDeliveryMethodShippingToOrderArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.addDeliveryMethodShipping(orderId, input);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

async function addDeliveryMethodPickupToOrder(
  _,
  { orderId, input }: MutationAddDeliveryMethodPickupToOrderArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.addDeliveryMethodPickup(orderId, input);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

async function addDiscountCodeToOrder(
  _,
  { orderId, code }: MutationAddDiscountCodeToOrderArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.addDiscountCode(orderId, code);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

async function addPaymentToOrder(
  _,
  { orderId, input }: MutationAddPaymentToOrderArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.addPayment(orderId, input);

  return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
}

export const OrderResolver: GraphqlApiResolver = {
  Query: {
    order,
    availablePickupLocations,
    availablePaymentMethods,
    availableShippingMethods
  },
  Mutation: {
    createOrder,
    addLineToOrder,
    updateOrderLine,
    removeOrderLine,
    addCustomerToOrder,
    addShippingAddressToOrder,
    addDeliveryMethodShippingToOrder,
    addDeliveryMethodPickupToOrder,
    addDiscountCodeToOrder,
    addPaymentToOrder
  }
};
