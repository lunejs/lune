import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { ID } from '@/persistence/entities/entity';
import type { OptionValue, OptionValueTable } from '@/persistence/entities/option_value';
import type { VariantOptionValueTable } from '@/persistence/entities/variant-option-value';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
import { Tables } from '@/persistence/tables';

export function createVariantOptionValuesLoader(trx: Transaction) {
  const optionValueSerializer = new OptionValueSerializer();

  return new DataLoader<string, OptionValue[]>(async variantIds => {
    const ids = variantIds as ID[];

    const rows: (OptionValueTable & VariantOptionValueTable)[] = await trx
      .from({ va: Tables.VariantOptionValue })
      .innerJoin({ a: Tables.OptionValue }, 'a.id', 'va.option_value_id')
      .select('va.variant_id', trx.ref('a.*'))
      // .whereNull('a.deleted_at') // if not, deleted option values wont show in orders page
      .whereIn('va.variant_id', ids);

    const byId = new Map<string, OptionValue[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      const { variant_id, ...assetCols } = r;

      byId
        .get(variant_id)
        ?.push(optionValueSerializer.deserialize(assetCols as OptionValueTable) as OptionValue);
    }

    return ids.map(id => byId.get(id) as OptionValue[]);
  });
}
