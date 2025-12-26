import type { DeliveryMethodShipping } from '@/persistence/entities/delivery-method-shipping';

import type { ExecutionContext } from '../context/types';

export const CommonDeliveryMethodShippingFieldResolver = {
  shippingMethod: async (parent: DeliveryMethodShipping, _: unknown, ctx: ExecutionContext) => {
    return ctx.loaders.deliveryMethod.shippingMethod.load(parent.shippingMethodId);
  }
};
