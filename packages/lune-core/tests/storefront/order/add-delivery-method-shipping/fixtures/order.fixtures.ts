import { LunePrice } from '@lune/common';

import { OrderState, type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';
import { ShopConstants } from './shop.fixtures';
import { StateConstants } from './state.fixtures';

export const OrderConstants = {
  ID: TestUtils.generateUUID(),
  PlacedID: TestUtils.generateUUID(),
  WithShippingAddressID: TestUtils.generateUUID(),
  WithDeliveryMethodID: TestUtils.generateUUID(),
  WithPickupDeliveryMethodID: TestUtils.generateUUID(),
  WithoutAvailableShippingMethod: TestUtils.generateUUID()
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
        state: OrderState.Placed,
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
        id: OrderConstants.WithShippingAddressID,
        total: LunePrice.toCent(120),
        subtotal: LunePrice.toCent(120),
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
        id: OrderConstants.WithDeliveryMethodID,
        total: LunePrice.toCent(300),
        subtotal: LunePrice.toCent(300),
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
        id: OrderConstants.WithPickupDeliveryMethodID,
        total: LunePrice.toCent(200),
        subtotal: LunePrice.toCent(200),
        shipping_address: {
          fullName: 'Joel Miller',
          streetLine1: '1st street',
          streetLine2: '2nd street',
          city: 'New York',
          postalCode: '07086',
          phoneNumber: '13125552046',
          references: 'In-store pickup',
          country: 'United States',
          countryCode: CountryConstants.UsCode,
          state: 'New York',
          stateCode: StateConstants.UsNewYorkCode
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.WithoutAvailableShippingMethod,
        shipping_address: {
          fullName: 'Sam',
          streetLine1: '1st street',
          streetLine2: '2nd street',
          city: 'Alaska city',
          postalCode: '07086',
          phoneNumber: '13125552046',
          references: 'Diet Mountain Dew',
          country: 'United States',
          countryCode: CountryConstants.UsCode,
          state: 'Alaska',
          stateCode: StateConstants.UsAlaskaCode
        }
      }
    ];
  }
}
