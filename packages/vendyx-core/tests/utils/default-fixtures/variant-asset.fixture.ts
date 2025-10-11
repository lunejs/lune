import type { VariantAssetTable } from '@/persistence/entities/variant-asset';

export const DefaultVariantAssetFixture = (): VariantAssetTable => ({
  asset_id: crypto.randomUUID(),
  variant_id: crypto.randomUUID(),
  order: 0
});
