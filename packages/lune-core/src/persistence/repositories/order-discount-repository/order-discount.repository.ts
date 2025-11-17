import type { Transaction } from '@/persistence/connection';
import type { OrderDiscount, OrderDiscountTable } from '@/persistence/entities/order-discount';
import { OrderDiscountSerializer } from '@/persistence/serializers/order-discount.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OrderDiscountRepository extends Repository<OrderDiscount, OrderDiscountTable> {
  constructor(trx: Transaction) {
    super(Tables.OrderDiscount, trx, new OrderDiscountSerializer());
  }
}
