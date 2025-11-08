import type { ZoneState, ZoneStateTable } from '../entities/zone-state';

import { Serializer } from './serializer';

export class ZoneStateSerializer extends Serializer<ZoneState, ZoneStateTable> {
  constructor() {
    super([
      ['zone_id', 'zoneId'],
      ['state_id', 'stateId']
    ]);
  }
}
