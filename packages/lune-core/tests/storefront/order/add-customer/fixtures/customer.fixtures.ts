import type { CustomerTable } from '@/persistence/entities/customer';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomerConstants = {
  ID: TestUtils.generateUUID(),
  Email: 'ellie@williams.com',
  FirstName: 'Ellie',
  LastName: 'Williams',
  PhoneNumber: '+5266716524352',

  AlreadyInOrderID: TestUtils.generateUUID(),
  AlreadyInOrderEmail: 'joel@miller.com',
  AlreadyInOrderFirstName: 'Joel',
  AlreadyInOrderLastName: 'Miller',
  AlreadyInOrderPhoneNumber: '+5266715079685'
};

export class CustomerFixtures implements Fixture<CustomerTable> {
  table: Tables = Tables.Customer;

  async build(): Promise<Partial<CustomerTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.ID,
        email: CustomerConstants.Email,
        first_name: CustomerConstants.FirstName,
        last_name: CustomerConstants.LastName,
        phone_number: CustomerConstants.PhoneNumber
      },
      {
        shop_id: ShopConstants.ID,
        id: CustomerConstants.AlreadyInOrderID,
        email: CustomerConstants.AlreadyInOrderEmail,
        first_name: CustomerConstants.AlreadyInOrderFirstName,
        last_name: CustomerConstants.AlreadyInOrderLastName,
        phone_number: CustomerConstants.AlreadyInOrderPhoneNumber
      }
    ];
  }
}
