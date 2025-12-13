import type { Variant } from '@/persistence/entities/variant';

import type { ExecutionContext } from '../context/types';
import type { VariantAssetsArgs } from '../types/graphql';
import { getPaginatedResult } from '../utils/pagination';

export const CommonVariantFieldResolver = {
  assets: async (parent: Variant, { input }: VariantAssetsArgs, ctx: ExecutionContext) => {
    const assets = await ctx.loaders.variant.assets.load(parent.id);

    return getPaginatedResult(assets, input);
  },
  optionValues: async (parent: Variant, _, ctx: ExecutionContext) => {
    const optionValues = await ctx.loaders.variant.optionValues.load(parent.id);

    return optionValues;
  },
  product: async (parent: Variant, _, ctx: ExecutionContext) => {
    const product = await ctx.loaders.variant.product.load(parent.productId);

    return product;
  }
};
