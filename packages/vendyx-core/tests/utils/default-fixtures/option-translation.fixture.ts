import type { OptionTranslationTable } from '@/persistence/entities/option-translation';

export const DefaultOptionTranslationFixture = (): OptionTranslationTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  locale: 'en' as any,
  option_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
