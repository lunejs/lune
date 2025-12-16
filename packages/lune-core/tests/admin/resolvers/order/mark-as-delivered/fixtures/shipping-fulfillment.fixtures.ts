import type { ShippingFulfillmentTable } from '@/persistence/entities/shipping-fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { ShippingMethodConstants } from './shipping-method.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ShippingFulfillmentConstants = {
  ForShippedID: TestUtils.generateUUID()
};

export class ShippingFulfillmentFixtures implements Fixture<ShippingFulfillmentTable> {
  table: Tables = Tables.ShippingFulfillment;

  async build(): Promise<Partial<ShippingFulfillmentTable>[]> {
    return [
      {
        id: ShippingFulfillmentConstants.ForShippedID,
        shop_id: ShopConstants.ID,
        fulfillment_id: FulfillmentConstants.ShippingForShippedID,
        shipping_method_id: ShippingMethodConstants.ID,
        method: 'Standard Shipping',
        carrier: 'FedEx',
        tracking_code: 'TRACK123',
        shipped_at: new Date()
      }
    ];
  }
}
