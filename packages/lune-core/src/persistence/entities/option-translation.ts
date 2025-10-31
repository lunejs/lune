import type { ID, LuneEntity, LuneTable } from './entity';
import type { Locale } from './locale';

/**
 * An option translation is a localized version of a option's fields
 */
export interface OptionTranslation extends LuneEntity {
  name?: string | null;
  locale: Locale;
  optionId: ID;
}

export interface OptionTranslationTable extends LuneTable {
  name?: string | null;
  locale: Locale;
  option_id: string;
  shop_id: string;
}
