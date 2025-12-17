import type { Customer } from '@/persistence/entities/customer';

import type { ExecutionContext } from '../context/types';
import type { CustomerOrdersArgs } from '../types/graphql';
import { ListResponse } from '../utils/list-response';

export const CommonCustomerFieldResolver = {
  orders: async (parent: Customer, { input }: CustomerOrdersArgs, ctx: ExecutionContext) => {
    const result = await ctx.loaders.customer.orders.load({ id: parent.id, args: input });

    return new ListResponse(result.items, result.items.length, { total: result.total });
  }
};
