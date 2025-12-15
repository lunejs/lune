import type { InStorePickupFulfillmentTable } from '@/persistence/entities/in-store-pickup-fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { LocationConstants } from './location.fixtures';
import { ShopConstants } from './shop.fixtures';

export const InStorePickupFulfillmentConstants = {
  ForPlacedID: TestUtils.generateUUID(),
  ForProcessingID: TestUtils.generateUUID()
};

export class InStorePickupFulfillmentFixtures implements Fixture<InStorePickupFulfillmentTable> {
  table: Tables = Tables.InStorePickupFulfillment;

  async build(): Promise<Partial<InStorePickupFulfillmentTable>[]> {
    const address = {
      name: 'Main Store',
      streetLine1: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      phoneNumber: '+1234567890',
      country: 'United States',
      countryCode: 'US',
      state: 'New York',
      stateCode: 'NY'
    };

    return [
      {
        id: InStorePickupFulfillmentConstants.ForPlacedID,
        shop_id: ShopConstants.ID,
        fulfillment_id: FulfillmentConstants.PickupForPlacedID,
        location_id: LocationConstants.ID,
        address: JSON.stringify(address)
      },
      {
        id: InStorePickupFulfillmentConstants.ForProcessingID,
        shop_id: ShopConstants.ID,
        fulfillment_id: FulfillmentConstants.PickupForProcessingID,
        location_id: LocationConstants.ID,
        address: JSON.stringify(address)
      }
    ];
  }
}
