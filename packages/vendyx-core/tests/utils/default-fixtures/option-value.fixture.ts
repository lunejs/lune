import type { OptionValueTable } from '@/persistence/entities/option_value';

export const DefaultOptionValueFixture = (): OptionValueTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
  name: '',
  order: 0,
  metadata: {},
  shop_id: crypto.randomUUID(),
  option_id: crypto.randomUUID()
});
