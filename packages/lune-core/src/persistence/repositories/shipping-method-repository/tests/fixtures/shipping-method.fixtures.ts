import type { ShippingMethodTable } from '@/persistence/entities/shipping-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';
import { ZoneConstants } from './zone.fixtures';

export const ShippingMethodConstants = {
  ExpressLocalID: TestHelper.generateUUID(),
  StandardLocalID: TestHelper.generateUUID(),
  DisabledLocalID: TestHelper.generateUUID(),

  ExpressInternationalID: TestHelper.generateUUID(),
  StandardInternationalID: TestHelper.generateUUID(),
  DisabledInternationalID: TestHelper.generateUUID()
};

export class ShippingMethodFixtures implements Fixture<ShippingMethodTable> {
  table = Tables.ShippingMethod;

  async build(): Promise<Partial<ShippingMethodTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.ExpressLocalID,
        enabled: true,
        name: 'Express Local',
        zone_id: ZoneConstants.LocalID
      },
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.StandardLocalID,
        enabled: true,
        name: 'Standard Local',
        zone_id: ZoneConstants.LocalID
      },
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.DisabledLocalID,
        enabled: false,
        name: 'Quick (deprecated)',
        zone_id: ZoneConstants.LocalID
      },

      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.ExpressInternationalID,
        enabled: true,
        name: 'Express International',
        zone_id: ZoneConstants.InternationalID
      },
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.StandardInternationalID,
        enabled: true,
        name: 'Standard International',
        zone_id: ZoneConstants.InternationalID
      },
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.DisabledInternationalID,
        enabled: false,
        name: 'Quick (deprecated)',
        zone_id: ZoneConstants.InternationalID
      }
    ];
  }
}
