import type { Transaction } from '@/persistence/connection';
import type {
  InStorePickupFulfillment,
  InStorePickupFulfillmentTable
} from '@/persistence/entities/in-store-pickup-fulfillment';
import { InStorePickupFulfillmentSerializer } from '@/persistence/serializers/in-store-pickup-fulfillment.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class InStorePickupFulfillmentRepository extends Repository<
  InStorePickupFulfillment,
  InStorePickupFulfillmentTable
> {
  constructor(trx: Transaction) {
    super(Tables.InStorePickupFulfillment, trx, new InStorePickupFulfillmentSerializer());
  }
}
