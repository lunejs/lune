import type { Transaction } from '@/persistence/connection/connection';
import type {
  DeliveryMethodShipping,
  DeliveryMethodShippingTable
} from '@/persistence/entities/delivery-method-shipping';
import { DeliveryMethodShippingSerializer } from '@/persistence/serializers/delivery-method-shipping.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class DeliveryMethodShippingRepository extends Repository<
  DeliveryMethodShipping,
  DeliveryMethodShippingTable
> {
  constructor(trx: Transaction) {
    super(Tables.DeliveryMethodShipping, trx, new DeliveryMethodShippingSerializer());
  }
}
