import { clean } from '@vendyx/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationAddCollectionTranslationArgs,
  MutationCreateCollectionArgs,
  MutationRemoveCollectionsArgs,
  MutationUpdateCollectionArgs,
  QueryCollectionArgs,
  QueryCollectionsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CollectionService } from '@/business/collection/collection.service';

async function collections(_, { input }: QueryCollectionsArgs, ctx: ExecutionContext) {
  const collectionService = new CollectionService(ctx);

  const [products, count] = await Promise.all([
    collectionService.find(input ?? {}),
    collectionService.count(input?.filters)
  ]);

  return new ListResponse(products, products.length, { total: count });
}

async function collection(_, input: QueryCollectionArgs, ctx: ExecutionContext) {
  const collectionService = new CollectionService(ctx);

  const { id, slug } = clean(input);

  return collectionService.findUnique(id, slug);
}

async function createCollection(_, { input }: MutationCreateCollectionArgs, ctx: ExecutionContext) {
  const collectionService = new CollectionService(ctx);

  return collectionService.create(input);
}

async function updateCollection(
  _,
  { id, input }: MutationUpdateCollectionArgs,
  ctx: ExecutionContext
) {
  const collectionService = new CollectionService(ctx);

  return collectionService.update(id, input);
}

async function removeCollection(_, { ids }: MutationRemoveCollectionsArgs, ctx: ExecutionContext) {
  const collectionService = new CollectionService(ctx);

  return collectionService.remove(ids);
}

async function addCollectionTranslation(
  _,
  { id, input }: MutationAddCollectionTranslationArgs,
  ctx: ExecutionContext
) {
  const collectionService = new CollectionService(ctx);

  return collectionService.addTranslation(id, input);
}

export const CollectionResolver: GraphqlApiResolver = {
  Mutation: {
    createCollection: UseUserGuard(createCollection),
    updateCollection: UseUserGuard(updateCollection),
    removeCollections: UseUserGuard(removeCollection),
    addCollectionTranslation: UseUserGuard(addCollectionTranslation)
  },
  Query: {
    collection: UseUserGuard(collection),
    collections: UseUserGuard(collections)
  }
};
