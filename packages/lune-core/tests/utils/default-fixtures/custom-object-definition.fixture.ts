import type { CustomObjectDefinitionTable } from '@/persistence/entities/custom-object-definition';

export const DefaultCustomObjectDefinitionFixture = (): CustomObjectDefinitionTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: 'Default Custom Object',
  key: 'default_custom_object',
  shop_id: crypto.randomUUID()
});
