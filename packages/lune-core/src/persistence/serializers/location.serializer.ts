import type { Location, LocationTable } from '../entities/location';

import { Serializer } from './serializer';

export class LocationSerializer extends Serializer<Location, LocationTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['street_line_1', 'streetLine1'],
      ['street_line_2', 'streetLine2'],
      ['city', 'city'],
      ['postal_code', 'postalCode'],
      ['phone_number', 'phoneNumber'],
      ['references', 'references'],
      ['enabled', 'enabled'],
      ['country_id', 'countryId'],
      ['state_id', 'stateId']
    ]);
  }
}
