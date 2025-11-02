import type { Country, CountryTable } from '../entities/country';

import { Serializer } from './serializer';

export class CountrySerializer extends Serializer<Country, CountryTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['code', 'code']
    ]);
  }
}
