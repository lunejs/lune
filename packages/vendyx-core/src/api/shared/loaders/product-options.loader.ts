import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { OptionTable } from '@/persistence/entities/option';
import type { ProductOptionTable } from '@/persistence/entities/product-option';
import { OptionSerializer } from '@/persistence/serializers/option.serializer';
import { Tables } from '@/persistence/tables';

import type { Option } from '../types/graphql';

export function createProductOptionsLoader(trx: Transaction) {
  const optionSerializer = new OptionSerializer();

  return new DataLoader<string, Option[]>(async productIds => {
    const ids = productIds as string[];

    const rows: (OptionTable & ProductOptionTable)[] = await trx
      .from({ po: Tables.ProductOption })
      .innerJoin({ o: Tables.Option }, 'o.id', 'po.option_id')
      .select('po.product_id', 'o.order', trx.ref('o.*'))
      .whereNull('o.deleted_at')
      .whereIn('po.product_id', ids)
      .orderBy([{ column: 'o.order', order: 'asc' }]);

    const byId = new Map<string, Option[]>();

    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      const { product_id, ...optionCols } = r;
      byId.get(product_id)?.push(optionSerializer.deserialize(optionCols) as Option);
    }

    return ids.map(id => byId.get(id) as Option[]);
  });
}
