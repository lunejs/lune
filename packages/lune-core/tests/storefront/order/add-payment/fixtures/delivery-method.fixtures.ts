import { LunePrice } from '@lune/common';

import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const DeliveryMethodConstants = {
  ID: TestUtils.generateUUID(),
  WithoutCustomerID: TestUtils.generateUUID(),
  LowStockID: TestUtils.generateUUID(),
  WithDiscountCodeID: TestUtils.generateUUID(),
  WithOrderLineDiscountID: TestUtils.generateUUID(),
  WithDeliveryMethodDiscountID: TestUtils.generateUUID()
};

export class DeliveryMethodFixtures implements Fixture<DeliveryMethodTable> {
  table: Tables = Tables.DeliveryMethod;

  async build(): Promise<Partial<DeliveryMethodTable>[]> {
    return [
      {
        id: DeliveryMethodConstants.ID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.ID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithoutCustomerID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithoutCustomerID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.LowStockID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithLowStockID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithDiscountCodeID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithDiscountCodeID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithOrderLineDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithOrderLineDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.WithDeliveryMethodDiscountID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.WithDeliveryMethodDiscountID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      }
    ];
  }
}
