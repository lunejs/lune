import type { Transaction } from '@/persistence/connection/connection';
import type { Fulfillment, FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentSerializer } from '@/persistence/serializers/fulfillment.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class FulfillmentRepository extends Repository<Fulfillment, FulfillmentTable> {
  constructor(trx: Transaction) {
    super(Tables.Fulfillment, trx, new FulfillmentSerializer());
  }
}
