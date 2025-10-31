import type { ID, LuneEntity, LuneTable } from './entity';
import type { Locale } from './locale';

/**
 * A product translation is a localized version of a product's fields
 */
export interface ProductTranslation extends LuneEntity {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  locale: Locale;
  productId: ID;
}

export interface ProductTranslationTable extends LuneTable {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  locale: Locale;
  product_id: string;
  shop_id: string;
}
