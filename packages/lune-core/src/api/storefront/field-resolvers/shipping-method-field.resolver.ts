import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonShippingMethodFieldResolver } from '@/api/shared/resolvers/shipping-method-field.resolver';

export const ShippingMethodFieldResolver: GraphqlApiResolver = {
  ShippingMethod: {
    ...CommonShippingMethodFieldResolver
  }
};
