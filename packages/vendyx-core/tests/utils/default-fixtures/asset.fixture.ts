import type { AssetTable } from '@/persistence/entities/asset';

export const DefaultAssetFixture = (): AssetTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  type: 'IMG',
  source: crypto.randomUUID(),
  provider_id: '',
  shop_id: crypto.randomUUID()
});
