import type { Transaction } from '@/persistence/connection';
import type { Discount, DiscountTable } from '@/persistence/entities/discount';
import { DiscountSerializer } from '@/persistence/serializers/discount.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class DiscountRepository extends Repository<Discount, DiscountTable> {
  constructor(trx: Transaction) {
    super(Tables.Discount, trx, new DiscountSerializer());
  }
}
