import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '@/persistence/entities/custom-field-definition';
import type { ProductCustomFieldTable } from '@/persistence/entities/product-custom-field';
import { CustomFieldDefinitionSerializer } from '@/persistence/serializers/custom-field-definition.serializer';
import { Tables } from '@/persistence/tables';

export type ProductCustomFieldWithDefinition = {
  id: string;
  value: unknown;
  definition: CustomFieldDefinition;
};

export type ProductCustomFieldsLoaderKey = {
  productId: string;
  keys?: string[] | null;
};

function getCacheKey(key: ProductCustomFieldsLoaderKey): string {
  return `${key.productId}:${JSON.stringify(key.keys ?? [])}`;
}

export function createProductCustomFieldsLoader(trx: Transaction) {
  return new DataLoader<ProductCustomFieldsLoaderKey, ProductCustomFieldWithDefinition[], string>(
    async loaderKeys => {
      const productIds = loaderKeys.map(k => k.productId);
      const filterKeys = loaderKeys[0]?.keys;

      const query = trx
        .from({ pcf: Tables.ProductCustomField })
        .innerJoin({ cfd: Tables.CustomFieldDefinition }, 'cfd.id', 'pcf.definition_id')
        .select('pcf.product_id', 'pcf.value', 'pcf.id as product_custom_field_id', 'cfd.*')
        .whereIn('pcf.product_id', productIds)
        .orderBy([
          { column: 'cfd.order', order: 'asc' },
          { column: 'cfd.created_at', order: 'asc' }
        ]);

      if (filterKeys?.length) {
        query.whereIn('cfd.key', filterKeys);
      }

      type Row = Pick<ProductCustomFieldTable, 'product_id' | 'value'> &
        CustomFieldDefinitionTable & { product_custom_field_id: string };

      const rows = (await query) as Row[];
      const serializer = new CustomFieldDefinitionSerializer();

      const byProductId = new Map<string, ProductCustomFieldWithDefinition[]>();
      for (const id of productIds) {
        byProductId.set(id, []);
      }

      for (const row of rows) {
        const { product_id, value, product_custom_field_id, ...definitionCols } = row;
        const definition = serializer.deserialize(definitionCols as CustomFieldDefinitionTable);

        byProductId.get(product_id)?.push({
          id: product_custom_field_id,
          value,
          definition: definition as CustomFieldDefinition
        });
      }

      return loaderKeys.map(key => byProductId.get(key.productId) ?? []);
    },
    { cacheKeyFn: getCacheKey }
  );
}
