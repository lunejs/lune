import type { CustomObjectEntryTable } from '@/persistence/entities/custom-object-entry';

export const DefaultCustomObjectEntryFixture = (): CustomObjectEntryTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  slug: 'default-entry',
  definition_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
