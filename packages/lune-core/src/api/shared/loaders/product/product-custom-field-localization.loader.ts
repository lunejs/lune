import type { Transaction } from '@/persistence/connection/connection';
import type { Locale } from '@/persistence/entities/locale';
import { Tables } from '@/persistence/tables';

import { customFieldLocalizationLoaderFactory } from '../custom-field-localization-loader-factory';

export function createProductCustomFieldLocalizationLoader(
  trx: Transaction,
  locale: Locale | null | undefined
) {
  return customFieldLocalizationLoaderFactory(trx, locale, Tables.ProductCustomFieldTranslation);
}
