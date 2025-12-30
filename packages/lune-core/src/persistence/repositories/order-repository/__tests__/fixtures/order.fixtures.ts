import { LunePrice } from '@lunejs/common';

import { type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  ID: TestUtils.generateUUID(),
  InStorePickupID: TestUtils.generateUUID()
};

export class OrderFixtures implements Fixture<OrderTable> {
  table: Tables = Tables.Order;

  async build(): Promise<Partial<OrderTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.ID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
        total_quantity: 2,
        customer_id: CustomerConstants.ID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.InStorePickupID,
        subtotal: LunePrice.toCent(2100),
        total: LunePrice.toCent(2300),
        total_quantity: 2,
        customer_id: CustomerConstants.ID
      }
    ];
  }
}
