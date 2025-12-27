import type { Transaction } from '@/persistence/connection/connection';
import type { ID } from '@/persistence/entities/entity';
import { FulfillmentState } from '@/persistence/entities/fulfillment';
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

  async findActiveByOrderLineId(orderLineId: ID) {
    const results = await this.trx(Tables.FulfillmentLine)
      .select('fulfillment_line.*')
      .join(Tables.Fulfillment, 'fulfillment.id', 'fulfillment_line.fulfillment_id')
      .where('fulfillment_line.order_line_id', orderLineId)
      .whereNot('fulfillment.state', FulfillmentState.Canceled);

    return results.map(row => this.serializer.deserialize(row) as FulfillmentLine);
  }

  async findActiveByOrderId(orderId: ID) {
    const results = await this.trx(Tables.FulfillmentLine)
      .select('fulfillment_line.*')
      .join(Tables.Fulfillment, 'fulfillment.id', 'fulfillment_line.fulfillment_id')
      .where('fulfillment.order_id', orderId)
      .whereNot('fulfillment.state', FulfillmentState.Canceled);

    return results.map(row => this.serializer.deserialize(row) as FulfillmentLine);
  }
}
