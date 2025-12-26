import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomObjectDefinition,
  CustomObjectDefinitionTable
} from '@/persistence/entities/custom-object-definition';
import { CustomObjectDefinitionSerializer } from '@/persistence/serializers/custom-object-definition.serializer';
import { Tables } from '@/persistence/tables';

export function createCustomFieldDefinitionReferenceTargetLoader(trx: Transaction) {
  return new DataLoader<string | null | undefined, CustomObjectDefinition | null>(
    async referenceTargetIds => {
      const nonNullIds = referenceTargetIds.filter((id): id is string => id != null);

      if (nonNullIds.length === 0) {
        return referenceTargetIds.map(() => null);
      }

      const rows = await trx<CustomObjectDefinitionTable>(Tables.CustomObjectDefinition)
        .whereIn('id', nonNullIds)
        .select('*');

      const serializer = new CustomObjectDefinitionSerializer();
      const map = new Map(
        rows.map(r => [r.id, serializer.deserialize(r) as CustomObjectDefinition])
      );

      return referenceTargetIds.map(id => (id ? (map.get(id) ?? null) : null));
    }
  );
}
