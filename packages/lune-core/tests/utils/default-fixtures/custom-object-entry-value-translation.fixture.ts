import type { CustomObjectEntryValueTranslationTable } from '@/persistence/entities/custom-object-entry-value-translation';

export const DefaultCustomObjectEntryValueTranslationFixture =
  (): CustomObjectEntryValueTranslationTable => ({
    id: crypto.randomUUID(),
    created_at: new Date(),
    updated_at: new Date(),
    value: JSON.stringify('Translated value'),
    locale: 'es',
    entry_value_id: crypto.randomUUID(),
    shop_id: crypto.randomUUID()
  });
