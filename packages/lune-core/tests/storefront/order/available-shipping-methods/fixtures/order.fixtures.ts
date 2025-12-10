import type { OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

export const OrderConstants = {
  WithNewYorkAddressID: TestUtils.generateUUID(),
  WithCaliforniaAddressID: TestUtils.generateUUID(),
  WithoutShippingAddressID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithNewYorkAddressID,
        shipping_address: {
          fullName: 'John Doe',
          streetLine1: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          phoneNumber: '1234567890',
          country: 'United States',
          countryCode: CountryConstants.Code,
          state: 'New York',
          stateCode: StateConstants.NewYorkCode
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithCaliforniaAddressID,
        shipping_address: {
          fullName: 'Jane Doe',
          streetLine1: '456 Oak Ave',
          city: 'Los Angeles',
          postalCode: '90001',
          phoneNumber: '0987654321',
          country: 'United States',
          countryCode: CountryConstants.Code,
          state: 'California',
          stateCode: StateConstants.CaliforniaCode
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithoutShippingAddressID
      }
    ];
  }
}
