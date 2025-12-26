import type { DeliveryMethodShippingTable } from '@/persistence/entities/delivery-method-shipping';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { DeliveryMethodConstants } from './delivery-method.fixtures';
import { ShippingMethodConstants } from './shipping-method.fixtures';
import { ShopConstants } from './shop.fixtures';

export const DeliveryMethodShippingConstants = {
  ID: TestUtils.generateUUID()
};

export class DeliveryMethodShippingFixtures implements Fixture<DeliveryMethodShippingTable> {
  table: Tables = Tables.DeliveryMethodShipping;

  async build(): Promise<Partial<DeliveryMethodShippingTable>[]> {
    return [
      {
        id: DeliveryMethodShippingConstants.ID,
        shop_id: ShopConstants.ID,
        shipping_method_id: ShippingMethodConstants.ExpressInternationalID,
        method: 'Standard International',
        delivery_method_id: DeliveryMethodConstants.ID
      }
    ];
  }
}
