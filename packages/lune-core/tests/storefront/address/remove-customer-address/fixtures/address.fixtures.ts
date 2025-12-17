import type { AddressTable } from '@/persistence/entities/address';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';
import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

const AddressToRemoveID = TestUtils.generateUUID();

export const AddressConstants = {
  AddressToRemoveID
};

export class AddressFixtures implements Fixture<AddressTable> {
  table: Tables = Tables.Address;

  async build(): Promise<Partial<AddressTable>[]> {
    return [
      {
        id: AddressConstants.AddressToRemoveID,
        shop_id: ShopConstants.ID,
        customer_id: CustomerConstants.AuthenticatedID,
        full_name: 'John Doe',
        street_line_1: '123 Main St',
        city: 'Guadalajara',
        postal_code: '44100',
        phone_number: '+521234567890',
        is_default: true,
        country_id: CountryConstants.MxID,
        state_id: StateConstants.MxJaliscoID
      }
    ];
  }
}
