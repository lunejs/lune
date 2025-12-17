import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

const CustomerID = TestUtils.generateUUID();

export const CustomerConstants = {
  ID: CustomerID,
  Email: 'customer@test.com',
  FirstName: 'John',
  LastName: 'Doe',
  PhoneNumber: '+521234567890'
};

export class CustomerFixtures implements Fixture<CustomerTable> {
  table: Tables = Tables.Customer;

  async build(): Promise<Partial<CustomerTable>[]> {
    return [
      {
        id: CustomerConstants.ID,
        shop_id: ShopConstants.ID,
        email: CustomerConstants.Email,
        first_name: CustomerConstants.FirstName,
        last_name: CustomerConstants.LastName,
        phone_number: CustomerConstants.PhoneNumber,
        enabled: true
      }
    ];
  }
}
