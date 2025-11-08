import type { Transaction } from '@/persistence/connection';
import type { Zone, ZoneTable } from '@/persistence/entities/zone';
import { ZoneSerializer } from '@/persistence/serializers/zone.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ZoneRepository extends Repository<Zone, ZoneTable> {
  constructor(trx: Transaction) {
    super(Tables.Zone, trx, new ZoneSerializer());
  }
}
