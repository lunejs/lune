import type { Discount, DiscountTable } from '../entities/discount';

import { Serializer } from './serializer';

export class DiscountSerializer extends Serializer<Discount, DiscountTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['deleted_at', 'deletedAt'],
      ['code', 'code'],
      ['application_mode', 'applicationMode'],
      ['application_level', 'applicationLevel'],
      ['per_customer_limit', 'perCustomerLimit'],
      ['starts_at', 'startsAt'],
      ['ends_at', 'endsAt'],
      ['enabled', 'enabled'],
      ['combinable', 'combinable'],
      ['handler', 'handler']
    ]);
  }
}
