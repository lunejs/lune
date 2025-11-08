import type { Transaction } from '@/persistence/connection';
import type { ShippingMethod, ShippingMethodTable } from '@/persistence/entities/shipping-method';
import { ShippingMethodSerializer } from '@/persistence/serializers/shipping-method.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ShippingMethodRepository extends Repository<ShippingMethod, ShippingMethodTable> {
  constructor(trx: Transaction) {
    super(Tables.ShippingMethod, trx, new ShippingMethodSerializer());
  }
}
