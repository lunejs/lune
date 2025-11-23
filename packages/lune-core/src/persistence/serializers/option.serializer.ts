import type { Option, OptionTable } from '../entities/option';

import { Serializer } from './serializer';

export class OptionSerializer extends Serializer<Option, OptionTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['deleted_at', 'deletedAt'],
      ['name', 'name'],
      ['order', 'order'],
      ['product_id', 'productId']
    ]);
  }
}
