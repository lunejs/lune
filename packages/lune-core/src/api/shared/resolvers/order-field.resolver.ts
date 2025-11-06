import type { Order } from '@/persistence/entities/order';

import type { ExecutionContext } from '../context/types';
import { ListResponse } from '../utils/list-response';

export const CommonOrderFieldResolver = {
  lines: async (parent: Order, _, ctx: ExecutionContext) => {
    const lines = await ctx.loaders.order.lines.load(parent.id);

    return new ListResponse(lines, lines.length, { total: lines.length });
  },
  customer: async (parent: Order, _, ctx: ExecutionContext) => {
    const customer = await ctx.loaders.order.customers.load(parent.customerId ?? null);

    return customer;
  }
};
