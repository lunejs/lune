import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { Variant, VariantTable } from '@/persistence/entities/variant';
import { VariantSerializer } from '@/persistence/serializers/variant.serializer';
import { Tables } from '@/persistence/tables';

export function createVariantsLoader(trx: Transaction) {
  return new DataLoader<string, Variant[]>(async productIds => {
    const variantSerializer = new VariantSerializer();

    const rows: VariantTable[] = await trx<VariantTable>(Tables.Variant)
      .whereNull('deleted_at')
      .whereIn('product_id', productIds)
      .orderBy('created_at', 'asc');

    const byProductId = new Map<string, Variant[]>();
    for (const id of productIds) byProductId.set(id, []);

    for (const r of rows) {
      const { product_id, ...variantCols } = r;
      const variant = variantSerializer.deserialize(variantCols as VariantTable) as Variant;
      byProductId.get(product_id)?.push(variant);
    }

    return (productIds as string[]).map(id => byProductId.get(id) ?? []);
  });
}
