import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Locale } from '@/persistence/entities/locale';
import { Tables } from '@/persistence/tables';

export function createCustomObjectEntryValueLocalizationLoader(
  trx: Transaction,
  locale: Locale | null | undefined
) {
  return new DataLoader<string, unknown | null>(async entryValueIds => {
    if (!locale) {
      return entryValueIds.map(() => null);
    }

    const rows = await trx(Tables.CustomObjectEntryValueTranslation)
      .select('entry_value_id', 'value')
      .whereIn('entry_value_id', entryValueIds)
      .andWhere('locale', locale);

    const byEntryValueId = new Map(rows.map(r => [r.entry_value_id, r.value as unknown]));

    return entryValueIds.map(id => byEntryValueId.get(id) ?? null);
  });
}
