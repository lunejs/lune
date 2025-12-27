import type { FulfillmentLineTable } from '@/persistence/entities/fulfillment-line';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { OrderLineConstants } from './order-line.fixtures';
import { ShopConstants } from './shop.fixtures';

export const FulfillmentLineConstants = {
  PartiallyFulfilledOrderFulfillmentLineID: TestUtils.generateUUID()
};

export class FulfillmentLineFixtures implements Fixture<FulfillmentLineTable> {
  table: Tables = Tables.FulfillmentLine;

  async build(): Promise<Partial<FulfillmentLineTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: FulfillmentLineConstants.PartiallyFulfilledOrderFulfillmentLineID,
        fulfillment_id: FulfillmentConstants.PartiallyFulfilledOrderFulfillmentID,
        order_line_id: OrderLineConstants.PartiallyFulfilledOrderLine1ID,
        quantity: 1
      }
    ];
  }
}
