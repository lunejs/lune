import type { Transaction } from '@/persistence/connection';
import type {
  OptionValuePreset,
  OptionValuePresetTable
} from '@/persistence/entities/option-value-preset';
import { BaseFilter } from '@/persistence/filters/base.filter';
import { OptionValuePresetSerializer } from '@/persistence/serializers/option-value-preset.serializer';
import { Tables } from '@/persistence/tables';

import type { OptionPresetValuesArgs } from '../../types/graphql';
import { loaderFactory } from '../loader-factory';

export function createOptionValuePresetsLoader(trx: Transaction) {
  const serializer = new OptionValuePresetSerializer();

  return loaderFactory<OptionValuePreset, OptionPresetValuesArgs['input']>({
    async getItemsFn(keyIds, keyArgs) {
      const itemsQuery = trx<OptionValuePresetTable>(Tables.OptionValuePreset).whereIn(
        'option_preset_id',
        keyIds
      );

      const rows = await new BaseFilter(itemsQuery).applyPagination(keyArgs ?? {}).build();

      return rows.map(r => ({
        keyId: r.option_preset_id,
        item: serializer.deserialize(r) as OptionValuePreset
      }));
    },
    async getCountsFn(keyIds) {
      const countRows = (await trx<OptionValuePresetTable>(Tables.OptionValuePreset)
        .whereIn('option_preset_id', keyIds)
        .select('option_preset_id')
        .count('* as total')
        .groupBy('option_preset_id')) as unknown as { option_preset_id: string; total: number }[];

      return countRows.map(r => ({ keyId: r.option_preset_id, total: r.total }));
    }
  });
}
