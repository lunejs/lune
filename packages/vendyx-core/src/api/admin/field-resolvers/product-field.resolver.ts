import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonProductFieldResolver } from '@/api/shared/resolvers/product-field.resolver';
import type { Product } from '@/persistence/entities/product';

export const ProductFieldResolver: GraphqlApiResolver = {
  Product: {
    ...CommonProductFieldResolver,
    translations: async (parent: Product, _, ctx: ExecutionContext) => {
      return ctx.loaders.product.translation.load(parent.id);
    }
  }
};
