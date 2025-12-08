import { OrderState, type OrderTable } from '@/persistence/entities/order';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants } from './customer.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OrderConstants = {
  ID: TestUtils.generateUUID(),
  WithCustomerID: TestUtils.generateUUID(),
  OrderPlacedID: TestUtils.generateUUID()
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
        state: OrderState.Placed
      }
    ];
  }
}
