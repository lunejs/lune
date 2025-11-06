import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonOrderLineFieldResolver } from '@/api/shared/resolvers/order-line-field.resolver';

export const OrderLineFieldResolver: GraphqlApiResolver = {
  OrderLine: {
    ...CommonOrderLineFieldResolver
  }
};
