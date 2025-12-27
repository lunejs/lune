import type { Transaction } from '@/persistence/connection/connection';
import type {
  FulfillmentLine,
  FulfillmentLineTable
} from '@/persistence/entities/fulfillment-line';
import { FulfillmentLineSerializer } from '@/persistence/serializers/fulfillment-line.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class FulfillmentLineRepository extends Repository<FulfillmentLine, FulfillmentLineTable> {
  constructor(trx: Transaction) {
    super(Tables.FulfillmentLine, trx, new FulfillmentLineSerializer());
  }
}
