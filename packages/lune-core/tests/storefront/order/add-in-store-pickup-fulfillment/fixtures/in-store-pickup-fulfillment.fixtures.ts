import type { InStorePickupFulfillmentTable } from '@/persistence/entities/in-store-pickup-fulfillment';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentConstants } from './fulfillment.fixtures';
import { LocationConstants } from './location.fixtures';
import { ShopConstants } from './shop.fixtures';

export const InStorePickupFulfillmentConstants = {
  ID: TestUtils.generateUUID()
};

export class InStorePickupFulfillmentFixtures implements Fixture<InStorePickupFulfillmentTable> {
  table: Tables = Tables.InStorePickupFulfillment;

  async build(): Promise<Partial<InStorePickupFulfillmentTable>[]> {
    return [
      {
        id: InStorePickupFulfillmentConstants.ID,
        shop_id: ShopConstants.ID,
        location_id: LocationConstants.ID,
        fulfillment_id: FulfillmentConstants.ID,
        address: {
          name: 'New York Store',
          streetLine1: '1st street',
          city: 'New York',
          postalCode: '07086'
        },
        ready_at: null,
        picked_up_at: null
      }
    ];
  }
}
