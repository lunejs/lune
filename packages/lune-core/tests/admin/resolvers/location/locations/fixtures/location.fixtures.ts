import type { LocationTable } from '@/persistence/entities/location';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { CountryConstants } from './country.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

export const LocationConstants = {
  ID: crypto.randomUUID(),
  LosAngelesID: crypto.randomUUID(),
  ChicagoID: crypto.randomUUID(),
  SeattleID: crypto.randomUUID(),
  PittsburghID: crypto.randomUUID(),
  JacksonID: crypto.randomUUID()
};

export class LocationFixtures implements Fixture<LocationTable> {
  table: Tables = Tables.Location;

  async build(): Promise<Partial<LocationTable>[]> {
    return [
      {
        id: LocationConstants.ID,
        name: 'New york warehouse',
        street_line_1: '1st street',
        street_line_2: '2nd street',
        city: 'New York',
        postal_code: '07086',
        phone_number: '13125552046',
        references: 'Petite',
        country_id: CountryConstants.UsID,
        state_id: StateConstants.UsNewYorkID,
        shop_id: ShopConstants.ID
      },
      {
        id: LocationConstants.LosAngelesID,
        name: 'Los Angeles warehouse',
        street_line_1: '1st street',
        street_line_2: '2nd street',
        city: 'Los Angeles',
        postal_code: '82735',
        phone_number: '13125552046',
        references: 'Pretty',
        country_id: CountryConstants.UsID,
        state_id: StateConstants.UsCaliforniaID,
        shop_id: ShopConstants.ID
      },
      {
        id: LocationConstants.ChicagoID,
        name: 'Chicago warehouse',
        street_line_1: '1st street',
        street_line_2: '2nd street',
        city: 'Chicago',
        postal_code: '19263',
        phone_number: '13125552046',
        references: 'Long',
        country_id: CountryConstants.UsID,
        state_id: StateConstants.UsIllinoisID,
        shop_id: ShopConstants.ID
      },
      {
        id: LocationConstants.SeattleID,
        name: 'Seattle warehouse',
        street_line_1: '1st street',
        street_line_2: '2nd street',
        city: 'Seattle',
        postal_code: '92635',
        phone_number: '13125552046',
        references: 'Dangerous',
        country_id: CountryConstants.UsID,
        state_id: StateConstants.UsWashingtonID,
        shop_id: ShopConstants.ID
      },
      {
        id: LocationConstants.PittsburghID,
        name: 'Pittsburgh warehouse',
        street_line_1: '1st street',
        street_line_2: '2nd street',
        city: 'Pittsburgh',
        postal_code: '72534',
        phone_number: '13125552046',
        references: 'Beauty',
        country_id: CountryConstants.UsID,
        state_id: StateConstants.UsPennsylvaniaID,
        shop_id: ShopConstants.ID
      },
      {
        id: LocationConstants.JacksonID,
        name: 'Jackson warehouse',
        street_line_1: '1st street',
        street_line_2: '2nd street',
        city: 'Jackson',
        postal_code: '56249',
        phone_number: '13125552046',
        references: 'Beauty',
        country_id: CountryConstants.UsID,
        state_id: StateConstants.UsWyomingID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
