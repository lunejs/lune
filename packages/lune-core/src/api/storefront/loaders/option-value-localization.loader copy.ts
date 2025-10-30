import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { Locale } from '@/persistence/entities/locale';
import type {
  OptionValueTranslation,
  OptionValueTranslationTable
} from '@/persistence/entities/option-value-translation';
import { OptionValueTranslationSerializer } from '@/persistence/serializers/option-value-translation.serializer';
import { Tables } from '@/persistence/tables';

export function createOptionValueLocalizationLoader(
  trx: Transaction,
  locale: Locale | null | undefined
) {
  return new DataLoader<string, OptionValueTranslation | null>(async optionValueIds => {
    if (!locale) {
      throw new Error('Locale is required to load product translations');
    }

    const optionValueTranslationSerializer = new OptionValueTranslationSerializer();
    const rows = await trx<OptionValueTranslationTable>(Tables.OptionTranslation)
      .select('option_value_id', 'name')
      .whereIn('option_value_id', optionValueIds)
      .andWhere('locale', locale);

    const byId = new Map(
      rows.map(r => [
        r.option_value_id,
        optionValueTranslationSerializer.deserialize(r) as OptionValueTranslation
      ])
    );

    return optionValueIds.map(id => byId.get(id) ?? null);
  });
}
