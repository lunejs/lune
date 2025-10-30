import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { OptionValueTranslationTable } from '@/persistence/entities/option-value-translation';
import { OptionValueTranslationSerializer } from '@/persistence/serializers/option-value-translation.serializer';
import { Tables } from '@/persistence/tables';

import type { OptionValueTranslation } from '../../types/graphql';

export function createOptionValuesTranslationsLoader(trx: Transaction) {
  return new DataLoader<string, OptionValueTranslation[]>(async optionValueIds => {
    const rows: OptionValueTranslationTable[] = await trx<OptionValueTranslationTable>(
      Tables.OptionValueTranslation
    )
      .whereIn('option_value_id', optionValueIds)
      .orderBy('created_at', 'asc');

    const optionValuesTranslationSerializer = new OptionValueTranslationSerializer();

    const byProductId = new Map<string, OptionValueTranslation[]>();
    for (const id of optionValueIds) byProductId.set(id, []);

    for (const r of rows) {
      const { option_value_id, ...translationCols } = r;
      const translation = optionValuesTranslationSerializer.deserialize(
        translationCols
      ) as unknown as OptionValueTranslation;
      byProductId.get(option_value_id)?.push(translation);
    }

    return (optionValueIds as string[]).map(id => byProductId.get(id) ?? []);
  });
}
