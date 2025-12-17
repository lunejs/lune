import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomerConstants = {
  // Enabled customer with credentials
  EnabledID: TestUtils.generateUUID(),
  EnabledEmail: 'enabled@customer.com',
  EnabledPassword: 'correctPassword123',

  // Disabled customer with credentials
  DisabledID: TestUtils.generateUUID(),
  DisabledEmail: 'disabled@customer.com',
  DisabledPassword: 'disabledPassword123',

  // Guest customer (no auth method)
  GuestID: TestUtils.generateUUID(),
  GuestEmail: 'guest@customer.com'
};

export class CustomerFixtures implements Fixture<CustomerTable> {
  table: Tables = Tables.Customer;

  async build(): Promise<Partial<CustomerTable>[]> {
    return [
      // Enabled customer with credentials
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.EnabledID,
        email: CustomerConstants.EnabledEmail,
        first_name: 'Enabled',
        last_name: 'Customer',
        enabled: true
      },
      // Disabled customer with credentials
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.DisabledID,
        email: CustomerConstants.DisabledEmail,
        first_name: 'Disabled',
        last_name: 'Customer',
        enabled: false
      },
      // Guest customer (no auth method)
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.GuestID,
        email: CustomerConstants.GuestEmail,
        first_name: 'Guest',
        last_name: 'Customer',
        enabled: true
      }
    ];
  }
}
