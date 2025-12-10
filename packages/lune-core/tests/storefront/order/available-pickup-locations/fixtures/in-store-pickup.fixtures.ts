import type { InStorePickupTable } from '@/persistence/entities/in-store-pickup';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { LocationConstants } from './location.fixtures';
import { ShopConstants } from './shop.fixtures';

export const InStorePickupConstants = {
  AvailableID: TestUtils.generateUUID(),
  NotAvailableID: TestUtils.generateUUID(),
  DisabledLocationID: TestUtils.generateUUID()
};

export class InStorePickupFixtures implements Fixture<InStorePickupTable> {
  table: Tables = Tables.InStorePickup;

  async build(): Promise<Partial<InStorePickupTable>[]> {
    return [
      {
        id: InStorePickupConstants.AvailableID,
        instructions: 'Bring ID and order confirmation',
        isAvailable: true,
        location_id: LocationConstants.AvailableID,
        shop_id: ShopConstants.ID
      },
      {
        id: InStorePickupConstants.NotAvailableID,
        instructions: 'Not available for pickup',
        isAvailable: false,
        location_id: LocationConstants.NotAvailableID,
        shop_id: ShopConstants.ID
      },
      {
        id: InStorePickupConstants.DisabledLocationID,
        instructions: 'Pickup available but location disabled',
        isAvailable: true,
        location_id: LocationConstants.DisabledID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
