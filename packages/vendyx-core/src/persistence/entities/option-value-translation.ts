import type { ID, VendyxEntity, VendyxTable } from './entity';
import type { Locale } from './locale';

/**
 * An option value translation is a localized version of a option values's fields
 */
export interface OptionValueTranslation extends VendyxEntity {
  name?: string | null;
  locale: Locale;
  optionValueId: ID;
}

export interface OptionValueTranslationTable extends VendyxTable {
  name?: string | null;
  locale: Locale;
  option_value_id: string;
  shop_id: string;
}
