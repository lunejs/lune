import type { ExecutionContext } from '../context/types';
import type { Product, ProductAssetsArgs } from '../types/graphql';
import { ListResponse } from '../utils/list-response';
import { getPaginatedResult } from '../utils/pagination';

export const CommonProductFieldResolver = {
  assets: async (parent: Product, { input }: ProductAssetsArgs, ctx: ExecutionContext) => {
    const assets = await ctx.loaders.product.assets.load(parent.id);

    return getPaginatedResult(assets, input);
  },
  tags: async (parent: Product, _, ctx: ExecutionContext) => {
    return ctx.loaders.product.tags.load(parent.id);
  },
  variants: () => {
    return new ListResponse([], 0, { total: 0 });
  }
};
