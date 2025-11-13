import type { Transaction } from '@/persistence/connection';
import type { ID } from '@/persistence/entities/entity';
import type { Zone, ZoneTable } from '@/persistence/entities/zone';
import type { ZoneStateTable } from '@/persistence/entities/zone-state';
import { ZoneSerializer } from '@/persistence/serializers/zone.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';
import { RepositoryError } from '../repository.error';

export class ZoneRepository extends Repository<Zone, ZoneTable> {
  constructor(trx: Transaction) {
    super(Tables.Zone, trx, new ZoneSerializer());
  }

  async upsertStates(zoneId: ID, states: ID[]) {
    try {
      const result = await this.trx<ZoneStateTable>(Tables.ZoneState)
        .insert(states.map(stateId => ({ state_id: stateId, zone_id: zoneId })))
        .onConflict(['state_id', 'zone_id'])
        .merge();

      return result;
    } catch (error) {
      throw new RepositoryError(error);
    }
  }
}
