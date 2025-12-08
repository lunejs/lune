import { OrderState, type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

export const OrderConstants = {
  ID: TestUtils.generateUUID(),
  WithShippingAddressId: TestUtils.generateUUID(),
  PlacedID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedID,
        state: OrderState.Placed
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithShippingAddressId,
        shipping_address: {
          fullName: 'Ellie Williams',
          streetLine1: '1st street',
          streetLine2: '2nd street',
          city: 'New York',
          postalCode: '07086',
          phoneNumber: '13125552046',
          references: 'It is a cool house come in u idiots :)',
          country: 'United States',
          countryCode: CountryConstants.UsCode,
          state: 'New York',
          stateCode: StateConstants.UsNewYorkCode
        }
      }
    ];
  }
}
