import { ShopTable } from '@/persistence/entities/shop';

export const DefaultShopFixture: ShopTable = {
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  slug: '',
  email: '',
  logo: '',
  name: '',
  phone_number: '',
  shop_api_key: '',
  socials: undefined,
  storefront_url: '',
  owner_id: crypto.randomUUID()
} satisfies Partial<ShopTable>;
