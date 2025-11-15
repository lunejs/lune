import type { ExecutionContext } from '../context/types';
import type {
  Collection,
  CollectionAssetsArgs,
  CollectionProductsArgs,
  CollectionSubCollectionsArgs
} from '../types/graphql';
import { ListResponse } from '../utils/list-response';
import { getPaginatedResult } from '../utils/pagination';

export const CommonCollectionFieldResolver = {
  assets: async (parent: Collection, { input }: CollectionAssetsArgs, ctx: ExecutionContext) => {
    const assets = await ctx.loaders.collections.assets.load(parent.id);

    return getPaginatedResult(assets, input);
  },
  products: async (parent: Collection, args: CollectionProductsArgs, ctx: ExecutionContext) => {
    const result = await ctx.loaders.collections.products.load({
      collectionId: parent.id,
      args
    });

    return new ListResponse(result.items, result.items.length, { total: result.total });
  },
  subCollections: async (
    parent: Collection,
    { input }: CollectionSubCollectionsArgs,
    ctx: ExecutionContext
  ) => {
    const subCollections = await ctx.loaders.collections.subCollections.load(parent.id);

    return getPaginatedResult(subCollections, input);
  }
};
