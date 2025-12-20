import { LunePrice } from '@lune/common';

import type { ShippingMethodTable } from '@/persistence/entities/shipping-method';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';
import { ZoneConstants } from './zone.fixtures';

export const ShippingMethodConstants = {
  ExpressLocalID: TestUtils.generateUUID(),
  StandardLocalID: TestUtils.generateUUID(),

  ExpressInternationalID: TestUtils.generateUUID(),
  StandardInternationalID: TestUtils.generateUUID()
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
        handler: {
          code: 'flat-shipping-handler',
          args: {
            price: LunePrice.toCent(100)
          }
        },
        zone_id: ZoneConstants.LocalID
      },
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.StandardLocalID,
        enabled: true,
        name: 'Standard Local',
        handler: {
          code: 'flat-shipping-handler',
          args: {
            price: LunePrice.toCent(100)
          }
        },
        zone_id: ZoneConstants.LocalID
      },

      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.ExpressInternationalID,
        enabled: true,
        name: 'Express International',
        handler: {
          code: 'flat-shipping-handler',
          args: {
            price: LunePrice.toCent(100)
          }
        },
        zone_id: ZoneConstants.InternationalID
      },
      {
        shop_id: ShopConstants.ID,
        id: ShippingMethodConstants.StandardInternationalID,
        enabled: true,
        name: 'Standard International',
        handler: {
          code: 'flat-shipping-handler',
          args: {
            price: LunePrice.toCent(50)
          }
        },
        zone_id: ZoneConstants.InternationalID
      }
    ];
  }
}
