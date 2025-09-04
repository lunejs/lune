import { OptionValue, OptionValueTable } from '../entities/option_value';

import { Serializer } from './serializer';

export class OptionValueSerializer extends Serializer<OptionValue, OptionValueTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['deleted_at', 'deletedAt'],
      ['name', 'name'],
      ['order', 'order'],
      ['metadata', 'metadata']
    ]);
  }
}
