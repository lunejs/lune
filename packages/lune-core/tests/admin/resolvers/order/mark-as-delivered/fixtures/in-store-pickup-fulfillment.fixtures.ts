import type { DeliveryMethodPickupTable } from '@/persistence/entities/delivery-method-pickup';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { LocationConstants } from './location.fixtures';
import { ShopConstants } from './shop.fixtures';

export const InStorePickupFulfillmentConstants = {
  ForReadyID: TestUtils.generateUUID()
};

export class InStorePickupFulfillmentFixtures implements Fixture<DeliveryMethodPickupTable> {
  table: Tables = Tables.DeliveryMethodPickup;

  async build(): Promise<Partial<DeliveryMethodPickupTable>[]> {
    const address = {
      name: 'Main Store',
      streetLine1: '123 Main St',
      city: 'Culiacan',
      postalCode: '80000',
      phoneNumber: '+526671234567',
      country: 'Mexico',
      countryCode: 'MX',
      state: 'Sinaloa',
      stateCode: 'SIN'
    };

    return [
      {
        id: InStorePickupFulfillmentConstants.ForReadyID,
        shop_id: ShopConstants.ID,
        delivery_method_id: FulfillmentConstants.PickupForReadyID,
        location_id: LocationConstants.ID,
        address: JSON.stringify(address)
      }
    ];
  }
}
