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
  AutomaticDiscountID: TestHelper.generateUUID()
};

export class DiscountFixtures implements Fixture<DiscountTable> {
  table = Tables.Discount;

  async build(): Promise<Partial<DiscountTable>[]> {
    const now = new Date();
    const pastDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

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
        per_customer_limit: 5,
        handler: { code: 'percentage_discount', args: { value: '10' } },
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
      }
    ];
  }
}
