import type { DeliveryMethodPickup } from '@/persistence/entities/delivery-method-pickup';

import type { ExecutionContext } from '../context/types';

export const CommonDeliveryMethodPickupFieldResolver = {
  location: async (parent: DeliveryMethodPickup, _: unknown, ctx: ExecutionContext) => {
    return ctx.loaders.deliveryMethod.location.load(parent.locationId);
  }
};
