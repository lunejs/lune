import type { CollectionTranslationTable } from '@/persistence/entities/collection-translation';

export const DefaultCollectionTranslationFixture = (): CollectionTranslationTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  slug: crypto.randomUUID(),
  description: null,
  collection_id: crypto.randomUUID(),
  locale: 'en' as any,
  shop_id: crypto.randomUUID()
});
