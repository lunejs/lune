import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomerConstants = {
  // Guest customer (from checkout, no auth method)
  GuestID: TestUtils.generateUUID(),
  GuestEmail: 'guest@checkout.com',
  GuestFirstName: 'Guest',
  GuestLastName: 'Customer',

  // Customer with credentials already registered
  RegisteredID: TestUtils.generateUUID(),
  RegisteredEmail: 'registered@customer.com',
  RegisteredFirstName: 'Registered',
  RegisteredLastName: 'Customer',
  RegisteredPassword: 'securePassword123'
};

export class CustomerFixtures implements Fixture<CustomerTable> {
  table: Tables = Tables.Customer;

  async build(): Promise<Partial<CustomerTable>[]> {
    return [
      // Guest customer (no auth method)
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.GuestID,
        email: CustomerConstants.GuestEmail,
        first_name: CustomerConstants.GuestFirstName,
        last_name: CustomerConstants.GuestLastName
      },
      // Customer with credentials (has auth method)
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.RegisteredID,
        email: CustomerConstants.RegisteredEmail,
        first_name: CustomerConstants.RegisteredFirstName,
        last_name: CustomerConstants.RegisteredLastName
      }
    ];
  }
}
