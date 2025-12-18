import type { Transaction } from '@/persistence/connection/connection';
import type { Location, LocationTable } from '@/persistence/entities/location';
import { LocationSerializer } from '@/persistence/serializers/location.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class LocationRepository extends Repository<Location, LocationTable> {
  constructor(trx: Transaction) {
    super(Tables.Location, trx, new LocationSerializer());
  }

  async findEnabledAndAvailableForInStorePickup(): Promise<Location[]> {
    const results = await this.trx(Tables.Location)
      .join(Tables.InStorePickup, `${Tables.Location}.id`, `${Tables.InStorePickup}.location_id`)
      .where(`${Tables.InStorePickup}.isAvailable`, true)
      .where(`${Tables.Location}.enabled`, true)
      .select(`${Tables.Location}.*`);

    return results.map(result => this.serializer.deserialize(result) as Location);
  }
}
