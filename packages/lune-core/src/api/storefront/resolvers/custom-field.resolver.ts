import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import type { CustomFieldReferencesArgs } from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import type { Collection } from '@/persistence/entities/collection';
import type { CustomFieldDefinition } from '@/persistence/entities/custom-field-definition';
import {
  CustomFieldAppliesTo,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import type { CustomObjectEntry } from '@/persistence/entities/custom-object-entry';
import type { Product } from '@/persistence/entities/product';

type CustomFieldParent = CustomFieldDefinition & {
  id: string;
  value: unknown;
};

type ReferenceItem = (Product | Collection | CustomObjectEntry) & { __typename: string };

export const CustomFieldResolver: GraphqlApiResolver = {
  CustomField: {
    value: async (parent: CustomFieldParent, _: unknown, ctx: ExecutionContext) => {
      const isTranslatable =
        parent.type === CustomFieldType.SingleLineText ||
        parent.type === CustomFieldType.MultiLineText;

      if (!ctx.storefront?.locale || !isTranslatable) {
        return parent.value;
      }

      if (parent.appliesToEntity === CustomFieldAppliesTo.Product) {
        const value = await ctx.loaders.product.customFieldLocalization.load(parent.id);
        return value || parent.value;
      }

      if (parent.appliesToEntity === CustomFieldAppliesTo.Collection) {
        const value = await ctx.loaders.collections.customFieldLocalization.load(parent.id);
        return value || parent.value;
      }

      return parent.value;
    },
    references: async (
      parent: CustomFieldParent,
      { input }: CustomFieldReferencesArgs,
      ctx: ExecutionContext
    ) => {
      const { id, type, value, isList } = parent;

      const isReferenceType =
        type === CustomFieldType.ProductReference ||
        type === CustomFieldType.CollectionReference ||
        type === CustomFieldType.CustomObjectReference;

      if (!isReferenceType) {
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

      if (type === CustomFieldType.CustomObjectReference) {
        const result = await ctx.loaders.customField.customObjectReferences.load({
          id,
          referenceIds,
          input
        });

        return new ListResponse(
          result.items.map(p => ({ ...p, __typename: 'CustomObject' })),
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
