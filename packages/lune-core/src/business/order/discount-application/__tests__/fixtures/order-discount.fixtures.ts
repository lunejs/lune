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
      // Customer already used LIMIT_EXCEEDED_DISCOUNT 2 times (reaching the limit)
      {
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PreviousUsage1ID,
        discount_id: DiscountConstants.LimitExceededDiscountID
      },
      {
        shop_id: ShopConstants.ID,
        order_id: OrderConstants.PreviousUsage2ID,
        discount_id: DiscountConstants.LimitExceededDiscountID
      }
    ];
  }
}
