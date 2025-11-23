import type { OptionValuePresetTable } from '@/persistence/entities/option-value-preset';

export const DefaultOptionValuePresetFixture = (): OptionValuePresetTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  order: 0,
  metadata: null,
  option_preset_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
