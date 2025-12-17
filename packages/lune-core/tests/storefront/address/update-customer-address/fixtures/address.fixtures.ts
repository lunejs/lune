import type { AddressTable } from '@/persistence/entities/address';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';
import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

const DefaultAddressID = TestUtils.generateUUID();
const SecondaryAddressID = TestUtils.generateUUID();

export const AddressConstants = {
  DefaultAddressID,
  SecondaryAddressID
};

export class AddressFixtures implements Fixture<AddressTable> {
  table: Tables = Tables.Address;

  async build(): Promise<Partial<AddressTable>[]> {
    return [
      // Default address
      {
        id: AddressConstants.DefaultAddressID,
        shop_id: ShopConstants.ID,
        customer_id: CustomerConstants.AuthenticatedID,
        full_name: 'John Doe',
        street_line_1: '123 Main St',
        street_line_2: 'Apt 4B',
        city: 'Guadalajara',
        postal_code: '44100',
        phone_number: '+521234567890',
        references: 'Next to the park',
        is_default: true,
        country_id: CountryConstants.MxID,
        state_id: StateConstants.MxJaliscoID
      },
      // Secondary address (not default)
      {
        id: AddressConstants.SecondaryAddressID,
        shop_id: ShopConstants.ID,
        customer_id: CustomerConstants.AuthenticatedID,
        full_name: 'John Doe',
        street_line_1: '456 Secondary St',
        city: 'Mexico City',
        postal_code: '06600',
        phone_number: '+529876543210',
        is_default: false,
        country_id: CountryConstants.MxID,
        state_id: StateConstants.MxCdmxID
      }
    ];
  }
}
