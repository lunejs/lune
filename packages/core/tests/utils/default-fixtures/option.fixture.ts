import { OptionTable } from '@/persistence/entities/option';

export const DefaultOptionFixture = (): OptionTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: new Date(),
  name: '',
  order: 0,
  shop_id: crypto.randomUUID()
});
