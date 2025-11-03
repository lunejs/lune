import type { Transaction } from '@/persistence/connection';
import type { Location, LocationTable } from '@/persistence/entities/location';
import { LocationSerializer } from '@/persistence/serializers/location.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class LocationRepository extends Repository<Location, LocationTable> {
  constructor(trx: Transaction) {
    super(Tables.Location, trx, new LocationSerializer());
  }
}
