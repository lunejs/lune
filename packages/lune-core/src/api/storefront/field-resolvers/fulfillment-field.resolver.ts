import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { FulfillmentDetailsUnionResolver } from '@/api/shared/resolvers/fulfillment-details.resolver';
import { CommonFulfillmentFieldResolver } from '@/api/shared/resolvers/fulfillment-field.resolver';
import { CommonInStorePickupFulfillmentFieldResolver } from '@/api/shared/resolvers/in-store-pickup-fulfillment-field.resolver';
import { CommonShippingFulfillmentFieldResolver } from '@/api/shared/resolvers/shipping-fulfillment-field.resolver';

export const FulfillmentFieldResolver: GraphqlApiResolver = {
  FulfillmentDetails: FulfillmentDetailsUnionResolver,
  Fulfillment: {
    ...CommonFulfillmentFieldResolver
  },
  ShippingFulfillment: {
    ...CommonShippingFulfillmentFieldResolver
  },
  InStorePickupFulfillment: {
    ...CommonInStorePickupFulfillmentFieldResolver
  }
};
