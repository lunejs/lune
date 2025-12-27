import { addDays, subDays } from 'date-fns';

import { LunePrice } from '@lune/common';

import type { DiscountTable } from '@/persistence/entities/discount';
import { ApplicationLevel, ApplicationMode } from '@/persistence/entities/discount';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants } from './order.fixtures';
import { ShopConstants } from './shop.fixtures';
import { VariantConstants } from './variant.fixtures';

export const DiscountConstants = {
  OrderDiscountID: TestUtils.generateUUID(),
  OrderDiscountCode: 'ORDER_DISCOUNT',

  OrderAutomaticDiscountCode: 'ORDER_AUTOMATIC_DISCOUNT',

  OrderLineAutomaticDiscountID: TestUtils.generateUUID(),
  OrderLineAutomaticDiscountCode: 'ORDER_LINE_AUTOMATIC_DISCOUNT',

  DeliveryMethodAutomaticDiscountID: TestUtils.generateUUID(),
  DeliveryMethodAutomaticDiscountCode: 'DELIVERY_METHOD_AUTOMATIC_DISCOUNT',

  DeliveryMethodForOrderWithoutDeliveryMethodID: TestUtils.generateUUID(),
  DeliveryMethodForOrderWithoutDeliveryMethodCode:
    'DELIVERY_METHOD_FOR_ORDER_WITHOUT_DELIVERY_METHOD',

  DisabledDiscountID: TestUtils.generateUUID(),
  DisabledDiscountCode: 'DISABLED_DISCOUNT',

  PrematureDiscountID: TestUtils.generateUUID(),
  PrematureDiscountCode: 'PREMATURE_DISCOUNT',

  ExpiredDiscountID: TestUtils.generateUUID(),
  ExpiredDiscountCode: 'EXPIRED_DISCOUNT',

  LimitExceededDiscountID: TestUtils.generateUUID(),
  LimitExceededDiscountCode: 'LIMIT_EXCEEDED_DISCOUNT'
};

export class DiscountFixtures implements Fixture<DiscountTable> {
  table: Tables = Tables.Discount;

  async build(): Promise<Partial<DiscountTable>[]> {
    return [
      // CODE discount for priority test
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.OrderDiscountID,
        code: DiscountConstants.OrderDiscountCode,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        handler: {
          code: 'order-discount',
          args: {
            applies: true
          }
        }
      },
      // Best automatic discount ($500)
      {
        shop_id: ShopConstants.ID,
        code: DiscountConstants.OrderAutomaticDiscountCode,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Automatic,
        handler: {
          code: 'order-discount',
          args: {
            applies: true,
            amountToDiscount: LunePrice.toCent(500)
          }
        }
      },
      // OrderLine level automatic discount ($600 per matching line - higher than order level $500)
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.OrderLineAutomaticDiscountID,
        code: DiscountConstants.OrderLineAutomaticDiscountCode,
        application_level: ApplicationLevel.OrderLine,
        application_mode: ApplicationMode.Automatic,
        handler: {
          code: 'order-line-discount',
          args: {
            variants: [VariantConstants.ForOrderLineLevelDiscountID], // Only applies to this specific variant
            amountToDiscount: LunePrice.toCent(600)
          }
        }
      },
      // DeliveryMethod level automatic discount ($550 - higher than order level $500)
      // Only applies to ForDeliveryMethodLevelID order
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.DeliveryMethodAutomaticDiscountID,
        code: DiscountConstants.DeliveryMethodAutomaticDiscountCode,
        application_level: ApplicationLevel.DeliveryMethod,
        application_mode: ApplicationMode.Automatic,
        handler: {
          code: 'fulfillment-discount',
          args: {
            applies: true,
            amountToDiscount: LunePrice.toCent(550),
            appliesToOrderId: OrderConstants.ForDeliveryMethodLevelID
          }
        }
      },
      // DeliveryMethod level discount for order WITHOUT delivery method ($600)
      // Only applies to WithoutDeliveryMethodID order
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.DeliveryMethodForOrderWithoutDeliveryMethodID,
        code: DiscountConstants.DeliveryMethodForOrderWithoutDeliveryMethodCode,
        application_level: ApplicationLevel.DeliveryMethod,
        application_mode: ApplicationMode.Automatic,
        handler: {
          code: 'fulfillment-discount',
          args: {
            applies: true,
            amountToDiscount: LunePrice.toCent(600),
            appliesToOrderId: OrderConstants.WithoutDeliveryMethodID
          }
        }
      },
      // Disabled discount
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.DisabledDiscountID,
        code: DiscountConstants.DisabledDiscountCode,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        enabled: false,
        handler: {
          code: 'order-discount',
          args: {
            applies: true,
            amountToDiscount: LunePrice.toCent(150)
          }
        }
      },
      // Premature discount (starts in the future)
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.PrematureDiscountID,
        code: DiscountConstants.PrematureDiscountCode,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        starts_at: addDays(new Date(), 5),
        handler: {
          code: 'order-discount',
          args: {
            applies: true,
            amountToDiscount: LunePrice.toCent(175)
          }
        }
      },
      // Expired discount
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.ExpiredDiscountID,
        code: DiscountConstants.ExpiredDiscountCode,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        starts_at: subDays(new Date(), 30),
        ends_at: subDays(new Date(), 1),
        handler: {
          code: 'order-discount',
          args: {
            applies: true,
            amountToDiscount: LunePrice.toCent(180)
          }
        }
      },
      // Discount with per_customer_limit exceeded
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.LimitExceededDiscountID,
        code: DiscountConstants.LimitExceededDiscountCode,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        starts_at: subDays(new Date(), 30),
        per_customer_limit: 2,
        handler: {
          code: 'order-discount',
          args: {
            applies: true,
            amountToDiscount: LunePrice.toCent(190)
          }
        }
      }
    ];
  }
}
