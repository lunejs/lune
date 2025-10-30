import type { ShopTable } from '@/persistence/entities/shop';

export const DefaultShopFixture = (): ShopTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  slug: crypto.randomUUID(),
  email: crypto.randomUUID(),
  logo: '',
  name: '',
  phone_number: '',
  storefront_api_key: crypto.randomUUID(),
  socials: undefined,
  storefront_url: crypto.randomUUID(),
  owner_id: crypto.randomUUID()
});
