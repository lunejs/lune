import type { DeliveryMethodPickupTable } from '@/persistence/entities/delivery-method-pickup';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { DeliveryMethodConstants } from './delivery-method.fixtures';
import { LocationConstants } from './location.fixtures';
import { ShopConstants } from './shop.fixtures';

export const DeliveryMethodPickupConstants = {
  ID: TestUtils.generateUUID()
};

export class DeliveryMethodPickupFixtures implements Fixture<DeliveryMethodPickupTable> {
  table: Tables = Tables.DeliveryMethodPickup;

  async build(): Promise<Partial<DeliveryMethodPickupTable>[]> {
    return [
      {
        id: DeliveryMethodPickupConstants.ID,
        shop_id: ShopConstants.ID,
        location_id: LocationConstants.ID,
        delivery_method_id: DeliveryMethodConstants.PickupID,
        address: {
          fullName: 'Joel Miller',
          streetLine1: '1st street',
          city: 'New York',
          postalCode: '07086'
        }
      }
    ];
  }
}
