import { ExecutionContext } from '../context/types';
import { GraphqlApiResolver } from '../graphql-api';
import { Product, ProductAssetsArgs } from '../types/graphql';
import { getProductLocalizedField } from '../utils/get-localized-field';
import { getPaginatedResult } from '../utils/pagination';

export const ProductFieldResolver: GraphqlApiResolver = {
  Product: {
    assets: async (parent: Product, { input }: ProductAssetsArgs, ctx: ExecutionContext) => {
      const assets = await ctx.loaders.product.assets.load(parent.id);

      return getPaginatedResult(assets, input);
    },
    tags: async (parent: Product, _, ctx: ExecutionContext) => {
      return ctx.loaders.product.tags.load(parent.id);
    },
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
