import type { LuneEntity, LuneTable } from './entity';
import type { Locale } from './locale';

/**
 * A collection translation is a localized version of a collections's fields
 */
export interface CollectionTranslation extends LuneEntity {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  locale: Locale;
  collectionId: string;
}

export interface CollectionTranslationTable extends LuneTable {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  locale: Locale;
  collection_id: string;
  shop_id: string;
}
