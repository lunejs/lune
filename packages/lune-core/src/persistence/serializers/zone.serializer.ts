import type { Zone, ZoneTable } from '../entities/zone';

import { Serializer } from './serializer';

export class ZoneSerializer extends Serializer<Zone, ZoneTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name']
    ]);
  }
}
