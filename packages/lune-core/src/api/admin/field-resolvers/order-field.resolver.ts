import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonOrderFieldResolver } from '@/api/shared/resolvers/order-field.resolver';

export const OrderFieldResolver: GraphqlApiResolver = {
  Order: {
    ...CommonOrderFieldResolver
  }
};
