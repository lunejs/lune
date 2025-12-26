import { addDays, subDays } from 'date-fns';

import type { DiscountTable } from '@/persistence/entities/discount';
import { ApplicationLevel, ApplicationMode } from '@/persistence/entities/discount';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';
import { VariantConstants } from './variant.fixtures';

export const DiscountConstants = {
  OrderDiscountID: TestUtils.generateUUID(),
  OrderDiscountCode: 'ORDER_DISCOUNT',
  OrderDiscountDoesNotApplyCode: 'ORDER_DISCOUNT_DOES_NOT_APPLY',

  DeliveryMethodDiscountID: TestUtils.generateUUID(),
  DeliveryMethodDiscountCode: 'DELIVERY_METHOD_DISCOUNT',
  DeliveryMethodDiscountDoesNotApplyCode: 'DELIVERY_METHOD_DISCOUNT_DOES_NOT_APPLY',

  OrderLineDiscountID: TestUtils.generateUUID(),
  OrderLineDiscountCode: 'ORDER_LINE_DISCOUNT',
  OrderLineDiscountDoesNotApplyCode: 'ORDER_LINE_DISCOUNT_DOES_NOT_APPLY',

  DisabledDiscount: 'DISABLED_DISCOUNT',
  PrematureDiscount: 'PREMATURE_DISCOUNT',
  ExpiredDiscount: 'EXPIRED_DISCOUNT',

  AlreadyUsedID: TestUtils.generateUUID(),
  AlreadyUsedCode: 'ALREADY_USED'
};

export class DiscountFixtures implements Fixture<DiscountTable> {
  table: Tables = Tables.Discount;

  async build(): Promise<Partial<DiscountTable>[]> {
    return [
      // order level
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
      {
        shop_id: ShopConstants.ID,
        code: DiscountConstants.OrderDiscountDoesNotApplyCode,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        handler: {
          code: 'order-discount',
          args: {
            applies: false
          }
        }
      },
      // delivery-method level
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.DeliveryMethodDiscountID,
        code: DiscountConstants.DeliveryMethodDiscountCode,
        application_level: ApplicationLevel.DeliveryMethod,
        application_mode: ApplicationMode.Code,
        handler: {
          code: 'fulfillment-discount',
          args: {
            applies: true
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        code: DiscountConstants.DeliveryMethodDiscountDoesNotApplyCode,
        application_level: ApplicationLevel.DeliveryMethod,
        application_mode: ApplicationMode.Code,
        handler: {
          code: 'fulfillment-discount',
          args: {
            applies: false
          }
        }
      },
      // order-line level
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.OrderLineDiscountID,
        code: DiscountConstants.OrderLineDiscountCode,
        application_level: ApplicationLevel.OrderLine,
        application_mode: ApplicationMode.Code,
        handler: {
          code: 'order-line-discount',
          args: {
            variants: [VariantConstants.ID]
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        code: DiscountConstants.OrderLineDiscountDoesNotApplyCode,
        application_level: ApplicationLevel.OrderLine,
        application_mode: ApplicationMode.Code,
        handler: {
          code: 'order-line-discount',
          args: {
            variants: [crypto.randomUUID()]
          }
        }
      },
      // Invalid
      {
        shop_id: ShopConstants.ID,
        code: DiscountConstants.DisabledDiscount,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        enabled: false,
        handler: {
          code: 'order-discount',
          args: {
            applies: true
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        code: DiscountConstants.PrematureDiscount,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        starts_at: addDays(new Date(), 5),
        handler: {
          code: 'order-discount',
          args: {
            applies: true
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        code: DiscountConstants.ExpiredDiscount,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        enabled: false,
        starts_at: subDays(new Date(), 30),
        ends_at: subDays(new Date(), 1),
        handler: {
          code: 'order-discount',
          args: {
            applies: true
          }
        }
      },
      {
        shop_id: ShopConstants.ID,
        id: DiscountConstants.AlreadyUsedID,
        code: DiscountConstants.AlreadyUsedCode,
        application_level: ApplicationLevel.Order,
        application_mode: ApplicationMode.Code,
        per_customer_limit: 2,
        handler: {
          code: 'order-discount',
          args: {
            applies: true
          }
        }
      }
    ];
  }
}
