import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '../entities/custom-field-definition';

import { Serializer } from './serializer';

export class CustomFieldDefinitionSerializer extends Serializer<
  CustomFieldDefinition,
  CustomFieldDefinitionTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['key', 'key'],
      ['is_list', 'isList'],
      ['applies_to_entity', 'appliesToEntity'],
      ['type', 'type'],
      ['metadata', 'metadata']
    ]);
  }
}
