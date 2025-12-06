import type { InStorePickupFulfillment } from '@/persistence/entities/in-store-pickup-fulfillment';

import type { ExecutionContext } from '../context/types';

export const CommonInStorePickupFulfillmentFieldResolver = {
  location: async (parent: InStorePickupFulfillment, _: unknown, ctx: ExecutionContext) => {
    return ctx.loaders.fulfillment.location.load(parent.locationId);
  }
};
