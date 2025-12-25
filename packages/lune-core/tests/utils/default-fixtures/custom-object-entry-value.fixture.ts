import type { CustomObjectEntryValueTable } from '@/persistence/entities/custom-object-entry-value';

export const DefaultCustomObjectEntryValueFixture = (): CustomObjectEntryValueTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  value: {},
  entry_id: crypto.randomUUID(),
  field_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
