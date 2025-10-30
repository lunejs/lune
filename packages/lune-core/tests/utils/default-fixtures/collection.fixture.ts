import { type CollectionTable } from '@/persistence/entities/collection';

export const DefaultCollectionFixture = (): CollectionTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  parent_id: null,
  slug: crypto.randomUUID(),
  description: null,
  content_type: 'PRODUCTS' as any,
  enabled: true,
  order: 0,
  shop_id: crypto.randomUUID()
});
