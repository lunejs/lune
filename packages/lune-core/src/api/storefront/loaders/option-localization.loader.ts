import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type { Locale } from '@/persistence/entities/locale';
import type {
  OptionTranslation,
  OptionTranslationTable
} from '@/persistence/entities/option-translation';
import { OptionTranslationSerializer } from '@/persistence/serializers/option-translation.serializer';
import { Tables } from '@/persistence/tables';

export function createOptionLocalizationLoader(
  trx: Transaction,
  locale: Locale | null | undefined
) {
  return new DataLoader<string, OptionTranslation | null>(async optionIds => {
    if (!locale) {
      throw new Error('Locale is required to load product translations');
    }

    const optionTranslationSerializer = new OptionTranslationSerializer();
    const rows = await trx<OptionTranslationTable>(Tables.OptionTranslation)
      .select('option_id', 'name')
      .whereIn('option_id', optionIds)
      .andWhere('locale', locale);

    const byId = new Map(
      rows.map(r => [r.option_id, optionTranslationSerializer.deserialize(r) as OptionTranslation])
    );
    return optionIds.map(id => byId.get(id) ?? null);
  });
}
