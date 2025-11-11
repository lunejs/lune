import type { FulfillmentDetailsResolvers } from '../types/graphql';

export const FulfillmentDetailsUnionResolver: FulfillmentDetailsResolvers = {
  __resolveType(obj) {
    if ('shippingMethodId' in obj) {
      return 'ShippingFulfillment';
    }

    if ('locationId' in obj) {
      return 'InStorePickupFulfillment';
    }

    return null;
  }
};
