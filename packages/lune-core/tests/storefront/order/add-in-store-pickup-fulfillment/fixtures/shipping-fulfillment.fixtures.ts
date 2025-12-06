import type { ShippingFulfillmentTable } from '@/persistence/entities/shipping-fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { ShippingMethodConstants } from './shipping-method.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ShippingFulfillmentConstants = {
  ID: TestHelper.generateUUID()
};

export class ShippingFulfillmentFixtures implements Fixture<ShippingFulfillmentTable> {
  table: Tables = Tables.ShippingFulfillment;

  async build(): Promise<Partial<ShippingFulfillmentTable>[]> {
    return [
      {
        id: ShippingFulfillmentConstants.ID,
        shop_id: ShopConstants.ID,
        shipping_method_id: ShippingMethodConstants.ExpressInternationalID,
        method: 'Express International',
        fulfillment_id: FulfillmentConstants.ShippingID
      }
    ];
  }
}
