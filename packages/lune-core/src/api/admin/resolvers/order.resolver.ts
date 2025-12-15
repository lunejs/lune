import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import { CommonOrderFieldResolver } from '@/api/shared/resolvers/order-field.resolver';
import type {
  MutationMarkOrderAsProcessingArgs,
  QueryOrderArgs,
  QueryOrdersArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { OrderService } from '@/business/order/order.service';
import { isErrorResult } from '@/utils/error-result';

async function orders(_, { input }: QueryOrdersArgs, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  const [orders, total] = await Promise.all([
    orderService.find(input ?? {}),
    orderService.count(input?.filters)
  ]);

  return new ListResponse(orders, orders.length, { total });
}

async function order(_, input: QueryOrderArgs, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  return orderService.findUnique(clean(input));
}

async function markOrderAsProcessing(
  _,
  input: MutationMarkOrderAsProcessingArgs,
  ctx: ExecutionContext
) {
  const orderService = new OrderService(ctx);

  const result = await orderService.markAsProcessing(input.id);

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
    markOrderAsProcessing: UseUserGuard(markOrderAsProcessing)
  },
  Order: {
    ...CommonOrderFieldResolver
  }
};
