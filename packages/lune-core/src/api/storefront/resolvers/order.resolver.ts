import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import type { MutationAddLineToOrderArgs, QueryOrderArgs } from '@/api/shared/types/graphql';
import { OrderService } from '@/business/order/order.service';
import { isErrorResult } from '@/utils/error-result';

async function order(_, input: QueryOrderArgs, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  return orderService.findUnique(clean(input));
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

export const OrderResolver: GraphqlApiResolver = {
  Query: {
    order
  },
  Mutation: {
    addLineToOrder
  }
};
