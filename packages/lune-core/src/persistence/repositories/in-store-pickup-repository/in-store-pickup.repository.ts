import type { Transaction } from '@/persistence/connection/connection';
import type { InStorePickup, InStorePickupTable } from '@/persistence/entities/in-store-pickup';
import { InStorePickupSerializer } from '@/persistence/serializers/in-store-pickup.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class InStorePickupRepository extends Repository<InStorePickup, InStorePickupTable> {
  constructor(trx: Transaction) {
    super(Tables.InStorePickup, trx, new InStorePickupSerializer());
  }
}
