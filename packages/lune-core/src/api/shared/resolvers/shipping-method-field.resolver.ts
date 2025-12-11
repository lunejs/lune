import { getConfig } from '@/config/config';
import type { ShippingMethod } from '@/persistence/entities/shipping-method';

import type { ExecutionContext } from '../context/types';

export const CommonShippingMethodFieldResolver = {
  pricePreview: (parent: ShippingMethod, _, ctx: ExecutionContext) => {
    const shippingHandler = getConfig().shipping.handlers.find(p => p.code === parent.handler.code);

    // TODO: This is supposed to be always true, a shipping method should always have a price calculator.
    // But sometimes the shipping method is created and later in the code the price calculator is removed.
    // This is a temporary fix, we should refactor the code to avoid this situation.
    if (!shippingHandler) return;

    const pricePreview = shippingHandler.getPricePreview(parent.handler.args, ctx);

    return pricePreview;
  }
};
