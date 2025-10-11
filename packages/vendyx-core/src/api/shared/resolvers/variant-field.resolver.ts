import type { ExecutionContext } from '../context/types';
import type { GraphqlApiResolver } from '../graphql-api';
import type { Variant, VariantAssetsArgs } from '../types/graphql';
import { getPaginatedResult } from '../utils/pagination';

export const CommonVariantFieldResolver: GraphqlApiResolver = {
  assets: async (parent: Variant, { input }: VariantAssetsArgs, ctx: ExecutionContext) => {
    const assets = await ctx.loaders.variant.assets.load(parent.id);

    return getPaginatedResult(assets, input);
  }
};
