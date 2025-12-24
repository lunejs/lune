import type {
  CustomObjectDefinition,
  CustomObjectDefinitionTable
} from '../entities/custom-object-definition';

import { Serializer } from './serializer';

export class CustomObjectDefinitionSerializer extends Serializer<
  CustomObjectDefinition,
  CustomObjectDefinitionTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['slug', 'slug']
    ]);
  }
}
