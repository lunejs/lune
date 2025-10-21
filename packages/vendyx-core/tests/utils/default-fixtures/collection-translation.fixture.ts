import type { CollectionTranslationTable } from '@/persistence/entities/collection-translation';
import { Locale } from '@/persistence/entities/locale';

export const DefaultCollectionTranslationFixture = (): CollectionTranslationTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  slug: crypto.randomUUID(),
  description: null,
  collection_id: crypto.randomUUID(),
  locale: Locale.EN,
  shop_id: crypto.randomUUID()
});
