import type { Fulfillment } from '@/persistence/entities/fulfillment';

import type { ExecutionContext } from '../context/types';

export const CommonFulfillmentFieldResolver = {
  details: async (parent: Fulfillment, _: unknown, ctx: ExecutionContext) => {
    const key = `${parent.id}:${parent.type}`;
    return ctx.loaders.fulfillment.details.load(key);
  }
};
