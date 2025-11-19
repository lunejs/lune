import type { DiscountUsage, DiscountUsageTable } from '../entities/discount-usage';

import { Serializer } from './serializer';

export class DiscountUsageSerializer extends Serializer<DiscountUsage, DiscountUsageTable> {
  constructor() {
    super([
      ['applied_at', 'appliedAt'],
      ['discount_id', 'discountId'],
      ['customer_id', 'customerId']
    ]);
  }
}
