import type { Customer, CustomerTable } from '../entities/customer';

import { Serializer } from './serializer';

export class CustomerSerializer extends Serializer<Customer, CustomerTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['first_name', 'firstName'],
      ['last_name', 'lastName'],
      ['email', 'email'],
      ['phone_number', 'phoneNumber'],
      ['enabled', 'enabled']
    ]);
  }
}
