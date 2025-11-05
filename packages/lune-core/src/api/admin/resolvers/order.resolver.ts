import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type { QueryOrderArgs } from '@/api/shared/types/graphql';
import { OrderService } from '@/business/order/order.service';

async function order(_, input: QueryOrderArgs, ctx: ExecutionContext) {
  const orderService = new OrderService(ctx);

  return orderService.findUnique(clean(input));
}

export const OrderResolver: GraphqlApiResolver = {
  Query: {
    order: UseUserGuard(order)
  }
};
