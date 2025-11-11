import type { ShippingFulfillment } from '@/persistence/entities/shipping-fulfillment';

import type { ExecutionContext } from '../context/types';

export const CommonShippingFulfillmentFieldResolver = {
  shippingMethod: async (parent: ShippingFulfillment, _: unknown, ctx: ExecutionContext) => {
    return ctx.loaders.fulfillment.shippingMethod.load(parent.shippingMethodId);
  }
};
