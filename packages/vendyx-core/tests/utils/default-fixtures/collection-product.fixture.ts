import type { CollectionProductTable } from '@/persistence/entities/collection-product';

export const DefaultCollectionProductFixture = (): CollectionProductTable => ({
  collection_id: crypto.randomUUID(),
  product_id: crypto.randomUUID()
});
