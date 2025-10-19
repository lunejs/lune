import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { OptionTranslationTable } from '@/persistence/entities/option-translation';
import { OptionTranslationSerializer } from '@/persistence/serializers/option-translation.serializer';
import { Tables } from '@/persistence/tables';

import type { OptionTranslation } from '../types/graphql';

export function createOptionTranslationsLoader(trx: Transaction) {
  return new DataLoader<string, OptionTranslation[]>(async optionIds => {
    const rows: OptionTranslationTable[] = await trx<OptionTranslationTable>(
      Tables.OptionTranslation
    )
      .whereIn('option_id', optionIds)
      .orderBy('created_at', 'asc');

    const optionTranslationSerializer = new OptionTranslationSerializer();

    const byProductId = new Map<string, OptionTranslation[]>();
    for (const id of optionIds) byProductId.set(id, []);

    for (const r of rows) {
      const { option_id, ...translationCols } = r;
      const translation = optionTranslationSerializer.deserialize(
        translationCols
      ) as unknown as OptionTranslation;
      byProductId.get(option_id)?.push(translation);
    }

    return (optionIds as string[]).map(id => byProductId.get(id) ?? []);
  });
}
