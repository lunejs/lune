import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { ID } from '@/persistence/entities/entity';
import type { OptionValue, OptionValueTable } from '@/persistence/entities/option_value';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
import { Tables } from '@/persistence/tables';

export function createOptionValuesLoader(trx: Transaction) {
  const optionValueSerializer = new OptionValueSerializer();

  return new DataLoader<string, OptionValue[]>(async optionIds => {
    const ids = optionIds as ID[];

    const rows: OptionValueTable[] = await trx(Tables.OptionValue).whereIn('option_id', ids);

    const byId = new Map<string, OptionValue[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      byId.get(r.option_id)?.push(optionValueSerializer.deserialize(r) as OptionValue);
    }

    return ids.map(id => byId.get(id) as OptionValue[]);
  });
}
