import { ExecutionContext } from '@/api/shared/context/types';
import { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonProductFieldResolver } from '@/api/shared/resolvers/product-field.resolver';
import { getProductLocalizedField } from '@/api/shared/utils/get-localized-field';
import { Product } from '@/persistence/entities/product';

export const ProductFieldResolver: GraphqlApiResolver = {
  Product: {
    ...CommonProductFieldResolver,
    name: async (parent: Product, _, ctx: ExecutionContext) => {
      return getProductLocalizedField(ctx, parent, 'name');
    },
    slug: async (parent: Product, _, ctx: ExecutionContext) => {
      return getProductLocalizedField(ctx, parent, 'slug');
    },
    description: async (parent: Product, _, ctx: ExecutionContext) => {
      return getProductLocalizedField(ctx, parent, 'description');
    }
  }
};
