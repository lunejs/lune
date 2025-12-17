import type { AddressTable } from '@/persistence/entities/address';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';
import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

export const AddressConstants = {
  ExistingAddressID: TestUtils.generateUUID()
};

export class AddressFixtures implements Fixture<AddressTable> {
  table: Tables = Tables.Address;

  async build(): Promise<Partial<AddressTable>[]> {
    return [
      // Existing default address for WithExistingAddress customer
      {
        id: AddressConstants.ExistingAddressID,
        shop_id: ShopConstants.ID,
        customer_id: CustomerConstants.WithExistingAddressID,
        full_name: 'Existing Address',
        street_line_1: '123 Existing St',
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
