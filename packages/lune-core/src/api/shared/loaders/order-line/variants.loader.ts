import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { Variant, VariantTable } from '@/persistence/entities/variant';
import { VariantSerializer } from '@/persistence/serializers/variant.serializer';
import { Tables } from '@/persistence/tables';

export function createOrderLineVariantsLoader(trx: Transaction) {
  return new DataLoader<string, Variant>(async variantIds => {
    const serializer = new VariantSerializer();
    const rows = await trx<VariantTable>(Tables.Variant).whereIn('id', variantIds).select('*');

    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as Variant]));
    return variantIds.map(id => map.get(id) as Variant);
  });
}
