import type { ZoneStateTable } from '@/persistence/entities/zone-state';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { StateConstants } from './state.fixtures';
import { ZoneConstants } from './zone.fixtures';

export const ZoneStateConstants = {
  ID: crypto.randomUUID()
};

export class ZoneStateFixtures implements Fixture<ZoneStateTable> {
  table: Tables = Tables.ZoneState;

  async build(): Promise<Partial<ZoneStateTable>[]> {
    return [
      {
        state_id: StateConstants.MxSinaloaID,
        zone_id: ZoneConstants.LocalID
      },
      {
        state_id: StateConstants.MxJaliscoID,
        zone_id: ZoneConstants.LocalID
      },

      {
        state_id: StateConstants.UsNewYorkID,
        zone_id: ZoneConstants.InternationalID
      },
      {
        state_id: StateConstants.UsArizonaID,
        zone_id: ZoneConstants.InternationalID
      }
    ];
  }
}
