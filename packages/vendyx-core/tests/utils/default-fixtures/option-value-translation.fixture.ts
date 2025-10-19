import type { OptionValueTranslationTable } from '@/persistence/entities/option-value-translation';

export const DefaultOptionValueTranslationFixture = (): OptionValueTranslationTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  locale: 'en' as any,
  option_value_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
