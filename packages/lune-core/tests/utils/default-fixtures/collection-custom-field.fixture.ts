import type { CollectionCustomFieldTable } from '@/persistence/entities/collection-custom-field';

export const DefaultCollectionCustomFieldFixture = (): CollectionCustomFieldTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  value: JSON.stringify('Default value'),
  collection_id: crypto.randomUUID(),
  definition_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
