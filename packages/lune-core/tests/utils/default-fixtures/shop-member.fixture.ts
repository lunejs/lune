import type { ShopMemberTable } from '@/persistence/entities/shop-member';

export const DefaultShopMemberFixture = (): ShopMemberTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  shop_id: crypto.randomUUID(),
  user_id: crypto.randomUUID()
});
