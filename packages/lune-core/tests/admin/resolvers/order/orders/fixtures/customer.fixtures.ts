import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomerConstants = {
  JohnID: TestUtils.generateUUID(),
  JohnEmail: 'john.doe@example.com',
  JohnFirstName: 'John',
  JohnLastName: 'Doe',

  JaneID: TestUtils.generateUUID(),
  JaneEmail: 'jane.smith@example.com',
  JaneFirstName: 'Jane',
  JaneLastName: 'Smith'
};

export class CustomerFixtures implements Fixture<CustomerTable> {
  table: Tables = Tables.Customer;

  async build(): Promise<Partial<CustomerTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.JohnID,
        email: CustomerConstants.JohnEmail,
        first_name: CustomerConstants.JohnFirstName,
        last_name: CustomerConstants.JohnLastName
      },
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.JaneID,
        email: CustomerConstants.JaneEmail,
        first_name: CustomerConstants.JaneFirstName,
        last_name: CustomerConstants.JaneLastName
      }
    ];
  }
}
