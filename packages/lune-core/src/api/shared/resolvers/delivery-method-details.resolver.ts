import type { DeliveryMethodDetailsResolvers } from '../types/graphql';

export const DeliveryMethodDetailsUnionResolver: DeliveryMethodDetailsResolvers = {
  __resolveType(obj) {
    if ('shippingMethodId' in obj) {
      return 'DeliveryMethodShipping';
    }

    if ('locationId' in obj) {
      return 'DeliveryMethodPickup';
    }

    return null;
  }
};
