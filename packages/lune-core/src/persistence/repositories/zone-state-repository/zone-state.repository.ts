import type { Transaction } from '@/persistence/connection/connection';
import type { ZoneState, ZoneStateTable } from '@/persistence/entities/zone-state';
import { ZoneStateSerializer } from '@/persistence/serializers/zone-state.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ZoneStateRepository extends Repository<ZoneState, ZoneStateTable> {
  constructor(trx: Transaction) {
    super(Tables.ZoneState, trx, new ZoneStateSerializer());
  }
}
