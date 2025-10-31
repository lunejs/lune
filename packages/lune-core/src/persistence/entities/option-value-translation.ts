import type { ID, LuneEntity, LuneTable } from './entity';
import type { Locale } from './locale';

/**
 * An option value translation is a localized version of a option values's fields
 */
export interface OptionValueTranslation extends LuneEntity {
  name?: string | null;
  locale: Locale;
  optionValueId: ID;
}

export interface OptionValueTranslationTable extends LuneTable {
  name?: string | null;
  locale: Locale;
  option_value_id: string;
  shop_id: string;
}
