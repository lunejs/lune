import type { OptionPresetTable } from '@/persistence/entities/option-preset';

export const DefaultOptionPresetFixture = (): OptionPresetTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  shop_id: crypto.randomUUID()
});
