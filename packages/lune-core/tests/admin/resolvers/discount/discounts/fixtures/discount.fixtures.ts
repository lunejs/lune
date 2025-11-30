import {
  ApplicationLevel,
  ApplicationMode,
  type DiscountTable
} from '@/persistence/entities/discount';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { ShopConstants } from './shop.fixtures';

export const DiscountConstants = {
  ActiveCodeDiscountID: TestHelper.generateUUID(),
  InactiveCodeDiscountID: TestHelper.generateUUID(),
  ExpiredDiscountID: TestHelper.generateUUID(),
  FutureDiscountID: TestHelper.generateUUID(),
  AutomaticDiscountID: TestHelper.generateUUID(),
  DisabledDiscountID: TestHelper.generateUUID(),
  OrderLevelDiscountID: TestHelper.generateUUID(),
  FulfillmentLevelDiscountID: TestHelper.generateUUID()
};

export class DiscountFixtures implements Fixture<DiscountTable> {
  table = Tables.Discount;

  async build(): Promise<Partial<DiscountTable>[]> {
    const now = new Date();
    const pastDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return [
      {
        id: DiscountConstants.ActiveCodeDiscountID,
        code: 'SUMMER2024',
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Order,
        starts_at: pastDate,
        ends_at: futureDate,
        enabled: true,
        combinable: true,
        handler: { code: 'percentage_discount', args: { value: '10' } },
        shop_id: ShopConstants.ID
      },
      {
        id: DiscountConstants.InactiveCodeDiscountID,
        code: 'INACTIVE',
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Order,
        starts_at: pastDate,
        ends_at: futureDate,
        enabled: true,
        combinable: false,
        handler: { code: 'fixed_discount', args: { value: '500' } },
        shop_id: ShopConstants.ID
      },
      {
        id: DiscountConstants.ExpiredDiscountID,
        code: 'EXPIRED',
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Order,
        starts_at: pastDate,
        ends_at: yesterday,
        enabled: true,
        combinable: true,
        handler: { code: 'percentage_discount', args: { value: '20' } },
        shop_id: ShopConstants.ID
      },
      {
        id: DiscountConstants.FutureDiscountID,
        code: 'FUTURE',
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Order,
        starts_at: futureDate,
        ends_at: null,
        enabled: true,
        combinable: true,
        handler: { code: 'percentage_discount', args: { value: '15' } },
        shop_id: ShopConstants.ID
      },
      {
        id: DiscountConstants.AutomaticDiscountID,
        code: 'AUTO_DISCOUNT',
        application_mode: ApplicationMode.Automatic,
        application_level: ApplicationLevel.Order,
        starts_at: pastDate,
        ends_at: futureDate,
        enabled: true,
        combinable: true,
        handler: { code: 'percentage_discount', args: { value: '5' } },
        shop_id: ShopConstants.ID
      },
      {
        id: DiscountConstants.DisabledDiscountID,
        code: 'DISABLED',
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Order,
        starts_at: pastDate,
        ends_at: futureDate,
        enabled: false,
        combinable: true,
        handler: { code: 'percentage_discount', args: { value: '25' } },
        shop_id: ShopConstants.ID
      },
      {
        id: DiscountConstants.OrderLevelDiscountID,
        code: 'ORDER_LEVEL',
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Order,
        starts_at: pastDate,
        ends_at: futureDate,
        enabled: true,
        combinable: true,
        handler: { code: 'percentage_discount', args: { value: '10' } },
        shop_id: ShopConstants.ID
      },
      {
        id: DiscountConstants.FulfillmentLevelDiscountID,
        code: 'FULFILLMENT_LEVEL',
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Fulfillment,
        starts_at: pastDate,
        ends_at: futureDate,
        enabled: true,
        combinable: true,
        handler: { code: 'fixed_discount', args: { value: '100' } },
        shop_id: ShopConstants.ID
      }
    ];
  }
}
