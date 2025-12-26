import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { CustomObjectEntryValueTranslationTable } from '@/persistence/entities/custom-object-entry-value-translation';
import { CustomObjectEntryValueTranslationSerializer } from '@/persistence/serializers/custom-object-entry-value-translation.serializer';
import { Tables } from '@/persistence/tables';

import type { CustomObjectEntryValueTranslation } from '../../types/graphql';

export function createCustomObjectEntryValueTranslationsLoader(trx: Transaction) {
  return new DataLoader<string, CustomObjectEntryValueTranslation[]>(async entryValueIds => {
    const rows: CustomObjectEntryValueTranslationTable[] =
      await trx<CustomObjectEntryValueTranslationTable>(Tables.CustomObjectEntryValueTranslation)
        .whereIn('entry_value_id', entryValueIds)
        .orderBy('created_at', 'asc');

    const serializer = new CustomObjectEntryValueTranslationSerializer();

    const byEntryValueId = new Map<string, CustomObjectEntryValueTranslation[]>();
    for (const id of entryValueIds) byEntryValueId.set(id, []);

    for (const r of rows) {
      const { entry_value_id, ...translationCols } = r;
      const translation = serializer.deserialize(
        translationCols
      ) as unknown as CustomObjectEntryValueTranslation;
      byEntryValueId.get(entry_value_id)?.push(translation);
    }

    return (entryValueIds as string[]).map(id => byEntryValueId.get(id) ?? []);
  });
}
