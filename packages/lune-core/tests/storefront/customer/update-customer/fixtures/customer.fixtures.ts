import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

const AuthenticatedID = TestUtils.generateUUID();
const AuthenticatedEmail = 'authenticated@customer.com';

const DisabledID = TestUtils.generateUUID();
const DisabledEmail = 'disabled@customer.com';

export const CustomerConstants = {
  AuthenticatedID,
  AuthenticatedEmail,
  AuthenticatedAccessToken: TestUtils.generateJWT({
    sub: AuthenticatedID,
    email: AuthenticatedEmail,
    enabled: true
  }),

  AlreadyUsedID: TestUtils.generateUUID(),
  AlreadyUsedEmail: 'other@customer.com',

  // Disabled customer
  DisabledID,
  DisabledEmail,
  DisabledAccessToken: TestUtils.generateJWT({
    sub: DisabledID,
    email: DisabledEmail,
    enabled: false
  })
};

export class CustomerFixtures implements Fixture<CustomerTable> {
  table: Tables = Tables.Customer;

  async build(): Promise<Partial<CustomerTable>[]> {
    return [
      // Authenticated customer
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.AuthenticatedID,
        email: CustomerConstants.AuthenticatedEmail,
        enabled: true
      },
      // Other customer (for email conflict test)
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.AlreadyUsedID,
        email: CustomerConstants.AlreadyUsedEmail,
        enabled: true
      },
      // Disabled customer
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.DisabledID,
        email: CustomerConstants.DisabledEmail,
        enabled: false
      }
    ];
  }
}
