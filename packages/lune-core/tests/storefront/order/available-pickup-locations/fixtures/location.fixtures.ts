import type { LocationTable } from '@/persistence/entities/location';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

export const LocationConstants = {
  AvailableID: TestUtils.generateUUID(),
  NotAvailableID: TestUtils.generateUUID(),
  DisabledID: TestUtils.generateUUID()
};

export class LocationFixtures implements Fixture<LocationTable> {
  table: Tables = Tables.Location;

  async build(): Promise<Partial<LocationTable>[]> {
    return [
      {
        id: LocationConstants.AvailableID,
        name: 'Available',
        enabled: true,
        country_id: CountryConstants.ID,
        state_id: StateConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: LocationConstants.NotAvailableID,
        name: 'Unavailable',
        enabled: true,
        country_id: CountryConstants.ID,
        state_id: StateConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: LocationConstants.DisabledID,
        name: 'Disabled',
        enabled: false,
        country_id: CountryConstants.ID,
        state_id: StateConstants.ID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
