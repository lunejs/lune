import type {
  CustomObjectEntryValue,
  CustomObjectEntryValueTable
} from '../entities/custom-object-entry-value';

import { Serializer } from './serializer';

export class CustomObjectEntryValueSerializer extends Serializer<
  CustomObjectEntryValue,
  CustomObjectEntryValueTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['value', 'value'],
      ['entry_id', 'entryId'],
      ['field_id', 'fieldId']
    ]);
  }
}
