import { LunePrice } from '@lunejs/common';

import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  ID: TestUtils.generateUUID(),
  InStorePickupID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<DeliveryMethodTable> {
  table: Tables = Tables.DeliveryMethod;

  async build(): Promise<Partial<DeliveryMethodTable>[]> {
    return [
      {
        id: FulfillmentConstants.ID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.ID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      },
      {
        id: FulfillmentConstants.InStorePickupID,
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200),
        order_id: OrderConstants.InStorePickupID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Pickup
      }
    ];
  }
}
