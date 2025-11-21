import type { OrderDiscountTable } from '@/persistence/entities/order-discount';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { DiscountConstants } from './discount.fixtures';
import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export class OrderDiscountFixtures implements Fixture<OrderDiscountTable> {
  table: Tables = Tables.OrderDiscount;

  async build(): Promise<Partial<OrderDiscountTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.ID,
        discount_id: DiscountConstants.OrderDiscountID
      },
      {
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PlacedID,
        discount_id: DiscountConstants.AlreadyUsedID
      },
      {
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PlacedID2,
        discount_id: DiscountConstants.AlreadyUsedID
      }
    ];
  }
}
