import { LunePrice } from '@lunejs/common';

import type { ShippingMethodTable } from '@/persistence/entities/shipping-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';
import { ZoneConstants } from './zone.fixtures';

export const ShippingMethodConstants = {
  ExpressID: TestUtils.generateUUID(),
  ExpressName: 'Express',

  StandardID: TestUtils.generateUUID(),
  StandardName: 'Standard',

  DisabledID: TestUtils.generateUUID(),
  DisabledName: 'Disabled'
};

export class ShippingMethodFixtures implements Fixture<ShippingMethodTable> {
  table = Tables.ShippingMethod;

  async build(): Promise<Partial<ShippingMethodTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.StandardID,
        enabled: true,
        name: ShippingMethodConstants.StandardName,
        handler: { code: 'flat-shipping-handler', args: { price: LunePrice.toCent(50) } },
        zone_id: ZoneConstants.EastCoastID,
        created_at: new Date('2024-01-01')
      },
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.ExpressID,
        enabled: true,
        name: ShippingMethodConstants.ExpressName,
        handler: { code: 'flat-shipping-handler', args: { price: LunePrice.toCent(100) } },
        zone_id: ZoneConstants.EastCoastID,
        created_at: new Date('2024-06-01')
      },
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.DisabledID,
        enabled: false,
        name: ShippingMethodConstants.DisabledName,
        handler: { code: 'flat-shipping-handler', args: { price: LunePrice.toCent(25) } },
        zone_id: ZoneConstants.EastCoastID,
        created_at: new Date('2024-03-01')
      }
    ];
  }
}
