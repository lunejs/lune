import type { State, StateTable } from '../entities/state';

import { Serializer } from './serializer';

export class StateSerializer extends Serializer<State, StateTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['code', 'code'],
      ['country_id', 'countryId']
    ]);
  }
}
