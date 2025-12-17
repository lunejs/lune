import {
  type CustomerAuthMethodTable,
  CustomerAuthProvider
} from '@/persistence/entities/customer-auth-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';

export class CustomerAuthMethodFixtures implements Fixture<CustomerAuthMethodTable> {
  table: Tables = Tables.CustomerAuthMethod;

  async build(): Promise<Partial<CustomerAuthMethodTable>[]> {
    const hashedPassword = await TestUtils.hashPassword(CustomerConstants.RegisteredPassword);

    return [
      // Auth method for the registered customer
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        customer_id: CustomerConstants.RegisteredID,
        provider: CustomerAuthProvider.Credentials,
        password: hashedPassword,
        provider_id: null
      }
    ];
  }
}
