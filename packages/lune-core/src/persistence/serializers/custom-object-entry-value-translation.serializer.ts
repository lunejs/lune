import type {
  CustomObjectEntryValueTranslation,
  CustomObjectEntryValueTranslationTable
} from '../entities/custom-object-entry-value-translation';

import { Serializer } from './serializer';

export class CustomObjectEntryValueTranslationSerializer extends Serializer<
  CustomObjectEntryValueTranslation,
  CustomObjectEntryValueTranslationTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['value', 'value'],
      ['locale', 'locale'],
      ['entry_value_id', 'entryValueId']
    ]);
  }
}
