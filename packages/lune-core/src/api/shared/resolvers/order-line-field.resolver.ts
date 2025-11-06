import type { OrderLine } from '@/persistence/entities/order-line';

import type { ExecutionContext } from '../context/types';

export const CommonOrderLineFieldResolver = {
  variant: async (parent: OrderLine, _, ctx: ExecutionContext) => {
    const variant = await ctx.loaders.orderLine.variant.load(parent.variantId);

    return variant;
  }
};
