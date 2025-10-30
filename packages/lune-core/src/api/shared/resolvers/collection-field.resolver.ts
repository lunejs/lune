import type { ExecutionContext } from '../context/types';
import type {
  Collection,
  CollectionAssetsArgs,
  CollectionProductsArgs,
  CollectionSubCollectionsArgs
} from '../types/graphql';
import { getPaginatedResult } from '../utils/pagination';

export const CommonCollectionFieldResolver = {
  assets: async (parent: Collection, { input }: CollectionAssetsArgs, ctx: ExecutionContext) => {
    const assets = await ctx.loaders.collections.assets.load(parent.id);

    return getPaginatedResult(assets, input);
  },
  // TODO: pass input to loaders in buildLoaders() getting input from req.body
  products: async (
    parent: Collection,
    { input }: CollectionProductsArgs,
    ctx: ExecutionContext
  ) => {
    const products = await ctx.loaders.collections.products.load(parent.id);

    return getPaginatedResult(products, input);
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
