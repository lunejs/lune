import type { ProductCustomFieldTranslationTable } from '@/persistence/entities/product-custom-field-translation';

export const DefaultProductCustomFieldTranslationFixture =
  (): ProductCustomFieldTranslationTable => ({
    id: crypto.randomUUID(),
    created_at: new Date(),
    updated_at: new Date(),
    value: 'Translated value',
    locale: 'es',
    product_custom_field_id: crypto.randomUUID(),
    shop_id: crypto.randomUUID()
  });
