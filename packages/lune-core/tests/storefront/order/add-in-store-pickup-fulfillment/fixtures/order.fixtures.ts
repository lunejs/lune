import { LunePrice } from '@lune/common';

import { OrderState, type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryConstants } from './country.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

export const OrderConstants = {
  ID: TestHelper.generateUUID(),
  PlacedID: TestHelper.generateUUID(),
  WithFulfillmentID: TestHelper.generateUUID(),
  WithShippingFulfillmentID: TestHelper.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ID,
        total: LunePrice.toCent(150),
        subtotal: LunePrice.toCent(150)
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.PlacedID,
        state: OrderState.Placed,
        total: LunePrice.toCent(200),
        subtotal: LunePrice.toCent(200),
        shipping_address: {
          fullName: 'Ellie Williams',
          streetLine1: '1st street',
          streetLine2: '2nd street',
          city: 'New York',
          postalCode: '07086',
          phoneNumber: '13125552046',
          references: 'Diet Mountain Dew',
          country: 'United States',
          countryCode: CountryConstants.UsCode,
          state: 'New York',
          stateCode: StateConstants.UsNewYorkCode
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithFulfillmentID,
        total: LunePrice.toCent(300),
        subtotal: LunePrice.toCent(300)
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithShippingFulfillmentID,
        total: LunePrice.toCent(250),
        subtotal: LunePrice.toCent(200),
        shipping_address: {
          fullName: 'Joel Miller',
          streetLine1: '1st street',
          streetLine2: '2nd street',
          city: 'New York',
          postalCode: '07086',
          phoneNumber: '13125552046',
          references: 'Shipping delivery',
          country: 'United States',
          countryCode: CountryConstants.UsCode,
          state: 'New York',
          stateCode: StateConstants.UsNewYorkCode
        }
      }
    ];
  }
}
