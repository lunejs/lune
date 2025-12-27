import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import { FulfillmentState } from '@/persistence/entities/fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentConstants = {
  PartiallyFulfilledOrderFulfillmentID: TestUtils.generateUUID()
};

export class FulfillmentFixtures implements Fixture<FulfillmentTable> {
  table: Tables = Tables.Fulfillment;

  async build(): Promise<Partial<FulfillmentTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentConstants.PartiallyFulfilledOrderFulfillmentID,
        order_id: OrderConstants.PartiallyFulfilledOrderID,
        state: FulfillmentState.Shipped,
        metadata: {
          carrier: 'DHL',
          trackingCode: 'TRACK123',
          shippedAt: new Date().toISOString(),
          deliveredAt: null
        }
      }
    ];
  }
}
