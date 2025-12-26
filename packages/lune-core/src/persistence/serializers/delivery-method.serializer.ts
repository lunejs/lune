import type { DeliveryMethod, DeliveryMethodTable } from '../entities/delivery-method';

import { Serializer } from './serializer';

export class DeliveryMethodSerializer extends Serializer<DeliveryMethod, DeliveryMethodTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['type', 'type'],
      ['amount', 'amount'],
      ['total', 'total'],
      ['order_id', 'orderId']
    ]);
  }
}
