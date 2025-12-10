import type { AssetTable } from '@/persistence/entities/asset';

export const DefaultAssetFixture = (): AssetTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  filename: 'test-image.jpg',
  ext: 'jpg',
  mime_type: 'image/jpeg',
  source: `https://example.com/${crypto.randomUUID()}.jpg`,
  size: 1024,
  provider_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
