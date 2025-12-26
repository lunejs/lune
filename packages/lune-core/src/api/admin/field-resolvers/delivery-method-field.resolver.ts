import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { DeliveryMethodDetailsUnionResolver } from '@/api/shared/resolvers/delivery-method-details.resolver';
import { CommonDeliveryMethodFieldResolver } from '@/api/shared/resolvers/delivery-method-field.resolver';
import { CommonDeliveryMethodPickupFieldResolver } from '@/api/shared/resolvers/delivery-method-pickup-field.resolver';
import { CommonDeliveryMethodShippingFieldResolver } from '@/api/shared/resolvers/delivery-method-shipping-field.resolver';

export const DeliveryMethodFieldResolver: GraphqlApiResolver = {
  DeliveryMethodDetails: DeliveryMethodDetailsUnionResolver,
  DeliveryMethod: {
    ...CommonDeliveryMethodFieldResolver
  },
  DeliveryMethodShipping: {
    ...CommonDeliveryMethodShippingFieldResolver
  },
  DeliveryMethodPickup: {
    ...CommonDeliveryMethodPickupFieldResolver
  }
};
