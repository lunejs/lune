import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/types';
import type { Locale } from '@/persistence/entities/locale';
import type { Tables } from '@/persistence/tables';

export function customFieldLocalizationLoaderFactory(
  trx: Transaction,
  locale: Locale | null | undefined,
  table: Tables
) {
  return new DataLoader<string, unknown | null>(async fieldIds => {
    if (!locale) {
      return fieldIds.map(() => null);
    }

    const rows = await trx(table)
      .select('field_id', 'value')
      .whereIn('field_id', fieldIds)
      .andWhere('locale', locale);

    const byFieldId = new Map(rows.map(r => [r.field_id, r.value as unknown]));

    return fieldIds.map(id => byFieldId.get(id) ?? null);
  });
}
