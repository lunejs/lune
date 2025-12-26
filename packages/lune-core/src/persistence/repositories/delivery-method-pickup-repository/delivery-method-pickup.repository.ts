import type { Transaction } from '@/persistence/connection/connection';
import type {
  DeliveryMethodPickup,
  DeliveryMethodPickupTable
} from '@/persistence/entities/delivery-method-pickup';
import { DeliveryMethodPickupSerializer } from '@/persistence/serializers/delivery-method-pickup.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class DeliveryMethodPickupRepository extends Repository<
  DeliveryMethodPickup,
  DeliveryMethodPickupTable
> {
  constructor(trx: Transaction) {
    super(Tables.DeliveryMethodPickup, trx, new DeliveryMethodPickupSerializer());
  }
}
