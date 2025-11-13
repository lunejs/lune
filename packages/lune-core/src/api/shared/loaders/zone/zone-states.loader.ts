import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { State, StateTable } from '@/persistence/entities/state';
import type { ZoneStateTable } from '@/persistence/entities/zone-state';
import { StateSerializer } from '@/persistence/serializers/state.serializer';
import { Tables } from '@/persistence/tables';

export function createZoneStatesLoader(trx: Transaction) {
  const stateSerializer = new StateSerializer();

  return new DataLoader<string, State[]>(async zoneIds => {
    const ids = zoneIds as string[];

    const rows = (await trx
      .from({ zs: Tables.ZoneState })
      .innerJoin({ s: Tables.State }, 's.id', 'zs.state_id')
      .select('zs.zone_id', trx.ref('s.*'))
      .whereIn('zs.zone_id', ids)) as (StateTable & ZoneStateTable)[];

    const byId = new Map<string, State[]>();
    for (const id of ids) byId.set(id, []);

    for (const r of rows) {
      const { zone_id, ...stateCols } = r;
      byId.get(zone_id)?.push(stateSerializer.deserialize(stateCols) as State);
    }

    return ids.map(id => byId.get(id) ?? []);
  });
}
