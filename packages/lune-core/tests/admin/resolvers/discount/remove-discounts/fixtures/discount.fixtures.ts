import {
  ApplicationLevel,
  ApplicationMode,
  type DiscountTable
} from '@/persistence/entities/discount';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const DiscountConstants = {
  Summer2025ID: TestUtils.generateUUID(),
  Winter2025ID: TestUtils.generateUUID(),
  Spring2025ID: TestUtils.generateUUID()
};

export class DiscountFixtures implements Fixture<DiscountTable> {
  table = Tables.Discount;

  async build(): Promise<Partial<DiscountTable>[]> {
    return [
      {
        id: DiscountConstants.Summer2025ID,
        shop_id: ShopConstants.ID,
        code: 'SUMMER2025',
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Order,
        enabled: true,
        combinable: false,
        starts_at: new Date('2025-01-01'),
        handler: {
          code: 'order-discount',
          args: {
            discountValue: { type: 'percentage', value: 20 },
            orderRequirements: { type: 'none' }
          }
        }
      },
      {
        id: DiscountConstants.Winter2025ID,
        shop_id: ShopConstants.ID,
        code: 'WINTER2025',
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Order,
        enabled: true,
        combinable: false,
        starts_at: new Date('2025-01-01'),
        handler: {
          code: 'order-discount',
          args: {
            discountValue: { type: 'percentage', value: 10 },
            orderRequirements: { type: 'none' }
          }
        }
      },
      {
        id: DiscountConstants.Spring2025ID,
        shop_id: ShopConstants.ID,
        code: 'SPRING2025',
        application_mode: ApplicationMode.Automatic,
        application_level: ApplicationLevel.OrderLine,
        enabled: true,
        combinable: false,
        starts_at: new Date('2025-01-01'),
        handler: {
          code: 'product-discount',
          args: {
            discountValue: { type: 'fixed', value: 500 },
            orderRequirements: { type: 'none' },
            variants: []
          }
        }
      }
    ];
  }
}
