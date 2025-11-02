import type { Address, AddressTable } from '../entities/address';

import { Serializer } from './serializer';

export class AddressSerializer extends Serializer<Address, AddressTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['full_name', 'fullName'],
      ['street_line_1', 'streetLine1'],
      ['street_line_2', 'streetLine2'],
      ['city', 'city'],
      ['postal_code', 'postalCode'],
      ['phone_number', 'phoneNumber'],
      ['is_default', 'isDefault'],
      ['references', 'references'],
      ['country_id', 'countryId'],
      ['state_id', 'stateId'],
      ['customer_id', 'customerId']
    ]);
  }
}
