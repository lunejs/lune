import type { LocationTable } from '@/persistence/entities/location';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

export const LocationConstants = {
  ID: TestUtils.generateUUID()
};

export class LocationFixtures implements Fixture<LocationTable> {
  table: Tables = Tables.Location;

  async build(): Promise<Partial<LocationTable>[]> {
    return [
      {
        id: LocationConstants.ID,
        shop_id: ShopConstants.ID,
        name: 'Main Store',
        street_line_1: '123 Main St',
        city: 'Culiacan',
        postal_code: '80000',
        phone_number: '+526671234567',
        enabled: true,
        country_id: CountryConstants.MxID,
        state_id: StateConstants.MxSinaloaID
      }
    ];
  }
}
