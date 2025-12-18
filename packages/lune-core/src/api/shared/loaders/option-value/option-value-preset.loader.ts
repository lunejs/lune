import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { ID } from '@/persistence/entities/entity';
import type {
  OptionValuePreset,
  OptionValuePresetTable
} from '@/persistence/entities/option-value-preset';
import { OptionValuePresetSerializer } from '@/persistence/serializers/option-value-preset.serializer';
import { Tables } from '@/persistence/tables';

export function createOptionValuePresetLoader(trx: Transaction) {
  const serializer = new OptionValuePresetSerializer();

  return new DataLoader<string, OptionValuePreset | null>(async presetIds => {
    const ids = presetIds as ID[];

    const rows: OptionValuePresetTable[] = await trx<OptionValuePresetTable>(
      Tables.OptionValuePreset
    ).whereIn('id', ids);

    const byId = new Map<string, OptionValuePreset>();

    for (const r of rows) {
      byId.set(r.id, serializer.deserialize(r) as OptionValuePreset);
    }

    return ids.map(id => byId.get(id) ?? null);
  });
}
