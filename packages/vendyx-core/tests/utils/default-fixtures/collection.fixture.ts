import { CollectionContentType, type CollectionTable } from '@/persistence/entities/collection';

export const DefaultCollectionFixture = (): CollectionTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  slug: crypto.randomUUID(),
  description: null,
  content_type: CollectionContentType.Products,
  enabled: true,
  order: 0,
  shop_id: crypto.randomUUID()
});
