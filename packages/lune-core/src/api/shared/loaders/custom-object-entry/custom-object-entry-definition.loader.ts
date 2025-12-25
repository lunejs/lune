import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomObjectDefinition,
  CustomObjectDefinitionTable
} from '@/persistence/entities/custom-object-definition';
import { CustomObjectDefinitionSerializer } from '@/persistence/serializers/custom-object-definition.serializer';
import { Tables } from '@/persistence/tables';

export function createCustomObjectEntryDefinitionLoader(trx: Transaction) {
  return new DataLoader<string, CustomObjectDefinition | null>(async definitionIds => {
    const rows = await trx<CustomObjectDefinitionTable>(Tables.CustomObjectDefinition)
      .whereIn('id', definitionIds)
      .select('*');

    const serializer = new CustomObjectDefinitionSerializer();
    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as CustomObjectDefinition]));

    return definitionIds.map(id => map.get(id) ?? null);
  });
}
