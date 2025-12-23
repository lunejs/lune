import type { CollectionCustomFieldTranslationTable } from '@/persistence/entities/collection-custom-field-translation';

export const DefaultCollectionCustomFieldTranslationFixture =
  (): CollectionCustomFieldTranslationTable => ({
    id: crypto.randomUUID(),
    created_at: new Date(),
    updated_at: new Date(),
    value: JSON.stringify('Translated value'),
    locale: 'es',
    field_id: crypto.randomUUID(),
    shop_id: crypto.randomUUID()
  });
