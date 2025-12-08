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
        name: 'New York Store',
        street_line_1: '1st street',
        street_line_2: '2nd street',
        city: 'New York',
        postal_code: '07086',
        phone_number: '13125552046',
        references: 'Main store',
        country_id: CountryConstants.UsID,
        state_id: StateConstants.UsNewYorkID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
