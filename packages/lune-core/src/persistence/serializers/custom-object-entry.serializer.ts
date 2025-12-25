import type {
  CustomObjectEntry,
  CustomObjectEntryTable
} from '../entities/custom-object-entry';

import { Serializer } from './serializer';

export class CustomObjectEntrySerializer extends Serializer<
  CustomObjectEntry,
  CustomObjectEntryTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['slug', 'slug'],
      ['definition_id', 'definitionId']
    ]);
  }
}
