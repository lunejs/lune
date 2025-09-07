import { ID, VendyxEntity, VendyxTable } from './entity';
import { Locale } from './locale';

/**
 * A product translation is a localized version of a product's fields
 */
export interface ProductTranslation extends VendyxEntity {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  locale: Locale;
  productId: ID;
}

export interface ProductTranslationTable extends VendyxTable {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  locale: Locale;
  product_id: string;
  shop_id: string;
}
