import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '@/persistence/entities/custom-field-definition';
import type { ProductCustomFieldTable } from '@/persistence/entities/product-custom-field';
import { CustomFieldDefinitionSerializer } from '@/persistence/serializers/custom-field-definition.serializer';
import { Tables } from '@/persistence/tables';

export interface ProductCustomFieldWithDefinition {
  id: string;
  value: unknown;
  definition: CustomFieldDefinition;
}

export function createProductCustomFieldsLoader(trx: Transaction) {
  return new DataLoader<string, ProductCustomFieldWithDefinition[]>(async productIds => {
    const rows = await trx
      .from({ pcf: Tables.ProductCustomField })
      .innerJoin({ cfd: Tables.CustomFieldDefinition }, 'cfd.id', 'pcf.definition_id')
      .select('pcf.product_id', 'pcf.value', 'pcf.id as product_custom_field_id', 'cfd.*')
      .whereIn('pcf.product_id', productIds)
      .orderBy('cfd.order', 'asc');

    type Row = Pick<ProductCustomFieldTable, 'product_id' | 'value'> &
      CustomFieldDefinitionTable & { product_custom_field_id: string };

    const serializer = new CustomFieldDefinitionSerializer();
    const byProductId = new Map<string, ProductCustomFieldWithDefinition[]>();
    for (const id of productIds) byProductId.set(id, []);

    for (const row of rows as Row[]) {
      const { product_id, value, product_custom_field_id, ...definitionCols } = row;
      const definition = serializer.deserialize(definitionCols as CustomFieldDefinitionTable);

      byProductId.get(product_id)?.push({
        id: product_custom_field_id,
        value,
        definition: definition as CustomFieldDefinition
      });
    }

    return (productIds as string[]).map(id => byProductId.get(id) ?? []);
  });
}
