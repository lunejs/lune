import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonVariantFieldResolver } from '@/api/shared/resolvers/variant-field.resolver';

export const VariantFieldResolver: GraphqlApiResolver = {
  Variant: {
    ...CommonVariantFieldResolver
  }
};
