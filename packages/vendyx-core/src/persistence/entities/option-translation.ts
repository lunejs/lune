import type { ID, VendyxEntity, VendyxTable } from './entity';
import type { Locale } from './locale';

/**
 * An option translation is a localized version of a option's fields
 */
export interface OptionTranslation extends VendyxEntity {
  name?: string | null;
  locale: Locale;
  optionId: ID;
}

export interface OptionTranslationTable extends VendyxTable {
  name?: string | null;
  locale: Locale;
  option_id: string;
  shop_id: string;
}
