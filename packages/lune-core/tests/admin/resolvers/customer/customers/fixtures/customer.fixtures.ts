import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { ShopConstants } from './shop.fixtures';

export const CustomerConstants = {
  Customer1Email: 'john@test.com',
  Customer1FirstName: 'John',
  Customer1LastName: 'Doe',

  Customer2FirstName: 'Jane',
  Customer2LastName: 'Smith',

  Customer3Email: 'disabled@test.com'
};

export class CustomerFixtures implements Fixture<CustomerTable> {
  table: Tables = Tables.Customer;

  async build(): Promise<Partial<CustomerTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        email: CustomerConstants.Customer1Email,
        first_name: CustomerConstants.Customer1FirstName,
        last_name: CustomerConstants.Customer1LastName,
        enabled: true
      },
      {
        shop_id: ShopConstants.ID,
        email: 'jane@test.com',
        first_name: CustomerConstants.Customer2FirstName,
        last_name: CustomerConstants.Customer2LastName,
        enabled: true
      },
      {
        shop_id: ShopConstants.ID,
        email: CustomerConstants.Customer3Email,
        first_name: 'Disabled',
        last_name: 'User',
        enabled: false
      }
    ];
  }
}
