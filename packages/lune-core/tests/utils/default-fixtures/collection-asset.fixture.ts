import type { CollectionAssetTable } from '@/persistence/entities/collection-asset';

export const DefaultCollectionAssetFixture = (): CollectionAssetTable => ({
  collection_id: crypto.randomUUID(),
  asset_id: crypto.randomUUID(),
  order: 0
});
