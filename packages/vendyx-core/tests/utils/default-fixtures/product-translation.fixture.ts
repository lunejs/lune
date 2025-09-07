import { ProductTranslationTable } from '@/persistence/entities/product-translation';

export const DefaultProductTranslationFixture = (): ProductTranslationTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  slug: crypto.randomUUID(),
  description: '',
  locale: 'en' as any,
  product_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
