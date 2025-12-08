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
  ID: TestUtils.generateUUID(),
  DuplicateCode: 'DUPLICATE50'
};

export class DiscountFixtures implements Fixture<DiscountTable> {
  table = Tables.Discount;

  async build(): Promise<Partial<DiscountTable>[]> {
    return [
      {
        id: DiscountConstants.ID,
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
