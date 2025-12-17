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
    const enabledPasswordHash = await TestUtils.hashPassword(CustomerConstants.EnabledPassword);
    const disabledPasswordHash = await TestUtils.hashPassword(CustomerConstants.DisabledPassword);

    return [
      // Auth method for enabled customer
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        customer_id: CustomerConstants.EnabledID,
        provider: CustomerAuthProvider.Credentials,
        password: enabledPasswordHash,
        provider_id: null
      },
      // Auth method for disabled customer
      {
        shop_id: ShopConstants.ID,
        id: TestUtils.generateUUID(),
        customer_id: CustomerConstants.DisabledID,
        provider: CustomerAuthProvider.Credentials,
        password: disabledPasswordHash,
        provider_id: null
      }
      // Note: Guest customer has NO auth method
    ];
  }
}
