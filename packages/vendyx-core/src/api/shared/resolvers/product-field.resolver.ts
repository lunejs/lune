import type { ExecutionContext } from '../context/types';
import type { Product, ProductAssetsArgs, ProductVariantsArgs } from '../types/graphql';
import { getPaginatedResult } from '../utils/pagination';

export const CommonProductFieldResolver = {
  assets: async (parent: Product, { input }: ProductAssetsArgs, ctx: ExecutionContext) => {
    const assets = await ctx.loaders.product.assets.load(parent.id);

    return getPaginatedResult(assets, input);
  },
  tags: async (parent: Product, _, ctx: ExecutionContext) => {
    return ctx.loaders.product.tags.load(parent.id);
  },
  variants: async (parent: Product, { input }: ProductVariantsArgs, ctx: ExecutionContext) => {
    const variants = await ctx.loaders.product.variants.load(parent.id);

    return getPaginatedResult(variants, input);
  }
};
