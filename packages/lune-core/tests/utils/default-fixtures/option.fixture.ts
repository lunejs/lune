import type { OptionTable } from '@/persistence/entities/option';

export const DefaultOptionFixture = (): OptionTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
  name: '',
  order: 0,
  product_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
