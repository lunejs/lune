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
  PickupID: TestUtils.generateUUID()
};

export class DeliveryMethodFixtures implements Fixture<DeliveryMethodTable> {
  table: Tables = Tables.DeliveryMethod;

  async build(): Promise<Partial<DeliveryMethodTable>[]> {
    return [
      {
        id: DeliveryMethodConstants.ID,
        amount: LunePrice.toCent(50),
        total: LunePrice.toCent(50),
        order_id: OrderConstants.WithDeliveryMethodID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: DeliveryMethodConstants.PickupID,
        amount: LunePrice.toCent(0),
        total: LunePrice.toCent(0),
        order_id: OrderConstants.WithPickupDeliveryMethodID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Pickup
      }
    ];
  }
}
