import type { ProductAssetTable } from '@/persistence/entities/product-asset';

export const DefaultProductAssetFixture = (): ProductAssetTable => ({
  asset_id: crypto.randomUUID(),
  product_id: crypto.randomUUID(),
  order: 0
});
