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
  Summer2025Code: 'SUMMER2025',
  Winter2025ID: TestUtils.generateUUID(),
  Winter2025Code: 'WINTER2025',
  DuplicateID: TestUtils.generateUUID(),
  DuplicateCode: 'DUPLICATE50'
};

export class DiscountFixtures implements Fixture<DiscountTable> {
  table = Tables.Discount;

  async build(): Promise<Partial<DiscountTable>[]> {
    return [
      {
        id: DiscountConstants.Summer2025ID,
        shop_id: ShopConstants.ID,
        code: DiscountConstants.Summer2025Code,
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
        code: DiscountConstants.Winter2025Code,
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
        id: DiscountConstants.DuplicateID,
        shop_id: ShopConstants.ID,
        code: DiscountConstants.DuplicateCode,
        application_mode: ApplicationMode.Code,
        application_level: ApplicationLevel.Order,
        enabled: true,
        combinable: false,
        starts_at: new Date('2025-01-01'),
        handler: {
          code: 'order-discount',
          args: {
            discountValue: { type: 'percentage', value: 50 },
            orderRequirements: { type: 'none' }
          }
        }
      }
    ];
  }
}
