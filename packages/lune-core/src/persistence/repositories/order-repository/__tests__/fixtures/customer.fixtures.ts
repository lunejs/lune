import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomerConstants = {
  ID: TestUtils.generateUUID()
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
