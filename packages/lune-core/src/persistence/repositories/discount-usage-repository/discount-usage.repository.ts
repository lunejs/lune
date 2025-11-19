import type { Transaction } from '@/persistence/connection';
import type { DiscountUsage, DiscountUsageTable } from '@/persistence/entities/discount-usage';
import { DiscountUsageSerializer } from '@/persistence/serializers/discount-usage.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class DiscountUsageRepository extends Repository<DiscountUsage, DiscountUsageTable> {
  constructor(trx: Transaction) {
    super(Tables.DiscountUsage, trx, new DiscountUsageSerializer());
  }
}
