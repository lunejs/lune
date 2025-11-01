import type { ExecutionContext } from '@/api/shared/context/types';
import { CommonCollectionFieldResolver } from '@/api/shared/resolvers/collection-field.resolver';
import type { Collection } from '@/persistence/entities/collection';

export const CollectionFieldResolver = {
  Collection: {
    ...CommonCollectionFieldResolver,
    translations: async (parent: Collection, _, ctx: ExecutionContext) => {
      return ctx.loaders.collections.translations.load(parent.id);
    }
  }
};
