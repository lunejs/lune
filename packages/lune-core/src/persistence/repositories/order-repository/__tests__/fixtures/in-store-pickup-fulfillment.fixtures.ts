import type { DeliveryMethodPickupTable } from '@/persistence/entities/delivery-method-pickup';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { LocationConstants } from './location.fixtures';
import { ShopConstants } from './shop.fixtures';

export const InStorePickupFulfillmentConstants = {
  ID: TestUtils.generateUUID()
};

export class InStorePickupFulfillmentFixtures implements Fixture<DeliveryMethodPickupTable> {
  table: Tables = Tables.DeliveryMethodPickup;

  async build(): Promise<Partial<DeliveryMethodPickupTable>[]> {
    return [
      {
        id: InStorePickupFulfillmentConstants.ID,
        shop_id: ShopConstants.ID,
        location_id: LocationConstants.ID,
        delivery_method_id: FulfillmentConstants.InStorePickupID,
        address: {
          name: 'New York Store',
          streetLine1: '1st street',
          city: 'New York',
          postalCode: '07086'
        }
      }
    ];
  }
}
