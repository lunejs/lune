import type { Transaction } from '@/persistence/connection/connection';
import type { DeliveryMethod, DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodSerializer } from '@/persistence/serializers/delivery-method.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class DeliveryMethodRepository extends Repository<DeliveryMethod, DeliveryMethodTable> {
  constructor(trx: Transaction) {
    super(Tables.DeliveryMethod, trx, new DeliveryMethodSerializer());
  }
}
