import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

export const CustomerConstants = {
  ID: TestHelper.generateUUID()
};

export class CustomerFixtures implements Fixture<CustomerTable> {
  table: Tables = Tables.Customer;

  async build(): Promise<Partial<CustomerTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.ID
      }
    ];
  }
}
