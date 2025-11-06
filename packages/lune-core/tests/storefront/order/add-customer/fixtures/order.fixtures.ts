import { OrderState, type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  ID: TestHelper.generateUUID(),
  WithCustomerID: TestHelper.generateUUID(),
  OrderPlacedID: TestHelper.generateUUID()
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
        id: OrderConstants.WithCustomerID,
        customer_id: CustomerConstants.AlreadyInOrderID
      },
      {
        shop_id: ShopConstants.ID,
        id: OrderConstants.OrderPlacedID,
        state: OrderState.PLACED
      }
    ];
  }
}
