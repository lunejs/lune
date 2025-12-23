import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomerConstants = {
  // Date range for tests
  StartsAt: '2024-12-15',
  EndsAt: '2024-12-17',

  // Expected counts per day
  Dec15Count: 3,
  Dec16Count: 2,
  Dec17Count: 1,
  GrandTotal: 6
};

export class CustomerFixtures implements Fixture<CustomerTable> {
  table: Tables = Tables.Customer;

  async build(): Promise<Partial<CustomerTable>[]> {
    return [
      // Dec 15 - 3 new customers
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        email: 'customer1@test.com',
        first_name: 'Customer',
        last_name: 'One',
        enabled: true,
        created_at: new Date('2024-12-15T08:00:00Z')
      },
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        email: 'customer2@test.com',
        first_name: 'Customer',
        last_name: 'Two',
        enabled: true,
        created_at: new Date('2024-12-15T12:00:00Z')
      },
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        email: 'customer3@test.com',
        first_name: 'Customer',
        last_name: 'Three',
        enabled: true,
        created_at: new Date('2024-12-15T18:00:00Z')
      },

      // Dec 16 - 2 new customers
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        email: 'customer4@test.com',
        first_name: 'Customer',
        last_name: 'Four',
        enabled: true,
        created_at: new Date('2024-12-16T10:00:00Z')
      },
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        email: 'customer5@test.com',
        first_name: 'Customer',
        last_name: 'Five',
        enabled: true,
        created_at: new Date('2024-12-16T15:00:00Z')
      },

      // Dec 17 - 1 new customer
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        email: 'customer6@test.com',
        first_name: 'Customer',
        last_name: 'Six',
        enabled: true,
        created_at: new Date('2024-12-17T09:00:00Z')
      }
    ];
  }
}
