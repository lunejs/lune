import type { ZoneStateTable } from '@/persistence/entities/zone-state';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { StateConstants } from './state.fixtures';
import { ZoneConstants } from './zone.fixtures';

export class ZoneStateFixtures implements Fixture<ZoneStateTable> {
  table: Tables = Tables.ZoneState;

  async build(): Promise<Partial<ZoneStateTable>[]> {
    return [
      {
        state_id: StateConstants.NewYorkID,
        zone_id: ZoneConstants.EastCoastID
      }
    ];
  }
}
