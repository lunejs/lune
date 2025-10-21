import type { VendyxEntity, VendyxTable } from './entity';
import type { Locale } from './locale';

/**
 * A collection translation is a localized version of a collections's fields
 */
export interface CollectionTranslation extends VendyxEntity {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  locale: Locale;
  collectionId: string;
}

export interface CollectionTranslationTable extends VendyxTable {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  locale: Locale;
  collection_id: string;
  shop_id: string;
}
