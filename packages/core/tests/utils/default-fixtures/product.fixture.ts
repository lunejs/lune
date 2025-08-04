import { ProductTable } from '@/persistence/entities/product';

export const DefaultProductFixture = (): ProductTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  slug: crypto.randomUUID(),
  description: '',
  enabled: true,
  max_sale_price: 0,
  min_sale_price: 0,
  deleted_at: new Date(),
  shop_id: crypto.randomUUID()
});
