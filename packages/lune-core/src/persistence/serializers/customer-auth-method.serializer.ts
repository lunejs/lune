import type { CustomerAuthMethod, CustomerAuthMethodTable } from '../entities/customer-auth-method';

import { Serializer } from './serializer';

export class CustomerAuthMethodSerializer extends Serializer<
  CustomerAuthMethod,
  CustomerAuthMethodTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['provider', 'provider'],
      ['provider_id', 'providerId'],
      ['password', 'password'],
      ['customer_id', 'customerId']
    ]);
  }
}
