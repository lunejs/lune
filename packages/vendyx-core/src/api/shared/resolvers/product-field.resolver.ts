import { ListResponse } from '@/utils/list-response';
import { ExecutionContext } from '../context/types';
import { GraphqlApiResolver } from '../graphql-api';
import { Product, ProductAssetsArgs } from '../types/graphql';

export const ProductFieldResolver: GraphqlApiResolver = {
  Product: {
    assets: async (parent: Product, { input }: ProductAssetsArgs, ctx: ExecutionContext) => {
      const [assets, total] = await Promise.all([
        ctx.repositories.product.findAssets(parent.id, input ?? {}),
        ctx.repositories.product.countAssets(parent.id)
      ]);

      return new ListResponse(assets, assets.length, { total });
    },
    tags: async (parent: Product, _, ctx: ExecutionContext) => {
      const tags = await ctx.repositories.product.findTags(parent.id);

      return tags;
    }
  }
};
