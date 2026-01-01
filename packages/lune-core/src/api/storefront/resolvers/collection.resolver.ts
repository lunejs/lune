import { clean } from '@lunejs/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonCollectionFieldResolver } from '@/api/shared/resolvers/collection-field.resolver';
import type {
  CollectionCustomFieldsArgs,
  CustomField,
  QueryCollectionArgs,
  QueryCollectionsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CollectionService } from '@/business/collection/collection.service';
import type { Collection } from '@/persistence/entities/collection';

import { UseStorefrontApiKeyGuard } from '../guards/storefront-api-key.guard';

async function collections(_, { input }: QueryCollectionsArgs, ctx: ExecutionContext) {
  const collectionService = new CollectionService(ctx);

  const [products, count] = await Promise.all([
    collectionService.find({
      ...input,
      filters: { ...input?.filters, enabled: { equals: true } }
    }),
    collectionService.count({
      ...input?.filters,
      enabled: { equals: true }
    })
  ]);

  return new ListResponse(products, products.length, { total: count });
}

async function collection(_, input: QueryCollectionArgs, ctx: ExecutionContext) {
  const collectionService = new CollectionService(ctx);

  const { id, slug } = clean(input);

  return collectionService.findUnique(id, slug, { enabled: true });
}

export const CollectionResolver: GraphqlApiResolver = {
  Query: {
    collection: UseStorefrontApiKeyGuard(collection),
    collections: UseStorefrontApiKeyGuard(collections)
  },
  Collection: {
    ...CommonCollectionFieldResolver,
    customFields: UseStorefrontApiKeyGuard(
      async (parent: Collection, { keys }: CollectionCustomFieldsArgs, ctx: ExecutionContext) => {
        const fields = await ctx.loaders.collections.customFields.load({
          collectionId: parent.id,
          keys
        });

        return fields.map(
          f =>
            ({
              id: f.id,
              key: f.definition.key,
              isList: f.definition.isList,
              type: f.definition.type,
              value: f.value
            }) satisfies Partial<CustomField> & { id: string }
        );
      }
    )
  }
};
