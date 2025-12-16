import type { ShippingMethodTable } from '@/persistence/entities/shipping-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';
import { ZoneConstants } from './zone.fixtures';

export const ShippingMethodConstants = {
  ID: TestUtils.generateUUID()
};

export class ShippingMethodFixtures implements Fixture<ShippingMethodTable> {
  table: Tables = Tables.ShippingMethod;

  async build(): Promise<Partial<ShippingMethodTable>[]> {
    return [
      {
        id: ShippingMethodConstants.ID,
        shop_id: ShopConstants.ID,
        zone_id: ZoneConstants.ID,
        name: 'Standard Shipping',
        enabled: true,
        handler: JSON.stringify({ code: 'flat-rate', args: { price: 500 } })
      }
    ];
  }
}
