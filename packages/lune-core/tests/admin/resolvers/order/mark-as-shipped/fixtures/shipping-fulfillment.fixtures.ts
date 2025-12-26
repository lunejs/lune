import type { DeliveryMethodShippingTable } from '@/persistence/entities/delivery-method-shipping';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { ShippingMethodConstants } from './shipping-method.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ShippingFulfillmentConstants = {
  ForPlacedID: TestUtils.generateUUID(),
  ForProcessingID: TestUtils.generateUUID()
};

export class ShippingFulfillmentFixtures implements Fixture<DeliveryMethodShippingTable> {
  table: Tables = Tables.DeliveryMethodShipping;

  async build(): Promise<Partial<DeliveryMethodShippingTable>[]> {
    return [
      {
        id: ShippingFulfillmentConstants.ForPlacedID,
        shop_id: ShopConstants.ID,
        delivery_method_id: FulfillmentConstants.ShippingForPlacedID,
        shipping_method_id: ShippingMethodConstants.ID,
        method: 'Standard Shipping'
      },
      {
        id: ShippingFulfillmentConstants.ForProcessingID,
        shop_id: ShopConstants.ID,
        delivery_method_id: FulfillmentConstants.ShippingForProcessingID,
        shipping_method_id: ShippingMethodConstants.ID,
        method: 'Standard Shipping'
      }
    ];
  }
}
