import type { DeliveryMethod } from '@/persistence/entities/delivery-method';

import type { ExecutionContext } from '../context/types';

export const CommonDeliveryMethodFieldResolver = {
  details: async (parent: DeliveryMethod, _: unknown, ctx: ExecutionContext) => {
    const key = `${parent.id}:${parent.type}`;
    return ctx.loaders.deliveryMethod.details.load(key);
  }
};
