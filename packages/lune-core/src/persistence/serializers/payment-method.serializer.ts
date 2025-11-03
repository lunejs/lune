import type { PaymentMethod, PaymentMethodTable } from '../entities/payment-method';

import { Serializer } from './serializer';

export class PaymentMethodSerializer extends Serializer<PaymentMethod, PaymentMethodTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['enabled', 'enabled'],
      ['handler', 'handler']
    ]);
  }
}
