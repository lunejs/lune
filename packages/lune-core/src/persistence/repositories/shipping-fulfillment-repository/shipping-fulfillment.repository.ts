import type { Transaction } from '@/persistence/connection';
import type {
  ShippingFulfillment,
  ShippingFulfillmentTable
} from '@/persistence/entities/shipping-fulfillment';
import { ShippingFulfillmentSerializer } from '@/persistence/serializers/shipping-fulfillment.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ShippingFulfillmentRepository extends Repository<
  ShippingFulfillment,
  ShippingFulfillmentTable
> {
  constructor(trx: Transaction) {
    super(Tables.ShippingFulfillment, trx, new ShippingFulfillmentSerializer());
  }
}
