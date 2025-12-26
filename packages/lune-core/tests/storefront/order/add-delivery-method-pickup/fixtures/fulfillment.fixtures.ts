import { LunePrice } from '@lune/common';

import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  ID: TestUtils.generateUUID(),
  ShippingID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<DeliveryMethodTable> {
  table: Tables = Tables.DeliveryMethod;

  async build(): Promise<Partial<DeliveryMethodTable>[]> {
    return [
      {
        id: FulfillmentConstants.ID,
        amount: LunePrice.toCent(0),
        total: LunePrice.toCent(0),
        order_id: OrderConstants.WithFulfillmentID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Pickup
      },
      {
        id: FulfillmentConstants.ShippingID,
        amount: LunePrice.toCent(50),
        total: LunePrice.toCent(50),
        order_id: OrderConstants.WithShippingFulfillmentID,
        shop_id: ShopConstants.ID,
        type: DeliveryMethodType.Shipping
      }
    ];
  }
}
