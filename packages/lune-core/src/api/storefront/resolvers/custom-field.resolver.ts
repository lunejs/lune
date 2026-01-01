import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import type { CustomFieldReferencesArgs } from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import type { Collection } from '@/persistence/entities/collection';
import { CustomFieldType } from '@/persistence/entities/custom-field-definition';
import type { Product } from '@/persistence/entities/product';

interface CustomFieldParent {
  id: string;
  key: string;
  value: unknown;
  type: string;
  isList: boolean;
}

type ReferenceItem = (Product | Collection) & { __typename: string };

export const CustomFieldResolver: GraphqlApiResolver = {
  CustomField: {
    references: async (
      parent: CustomFieldParent,
      { input }: CustomFieldReferencesArgs,
      ctx: ExecutionContext
    ) => {
      const { id, type, value, isList } = parent;

      const isReferenceType =
        type !== CustomFieldType.ProductReference && type !== CustomFieldType.CollectionReference;

      if (isReferenceType) {
        return { items: [], count: 0, pageInfo: { total: 0 } };
      }

      const referenceIds = (isList ? value : value ? [value] : []) as string[];

      if (!referenceIds.length) {
        return { items: [], count: 0, pageInfo: { total: 0 } };
      }

      if (type === CustomFieldType.ProductReference) {
        const result = await ctx.loaders.customField.productReferences.load({
          id,
          referenceIds,
          input
        });

        return new ListResponse(
          result.items.map(p => ({ ...p, __typename: 'Product' })),
          result.count,
          result.pageInfo
        );
      }

      if (type === CustomFieldType.CollectionReference) {
        const result = await ctx.loaders.customField.collectionReferences.load({
          id,
          referenceIds,
          input
        });

        return new ListResponse(
          result.items.map(p => ({ ...p, __typename: 'Collection' })),
          result.count,
          result.pageInfo
        );
      }
    }
  },
  CustomFieldReference: {
    __resolveType(obj: ReferenceItem) {
      return obj.__typename;
    }
  }
};
