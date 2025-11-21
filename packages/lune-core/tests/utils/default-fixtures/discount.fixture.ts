import { subDays } from 'date-fns';

import {
  ApplicationLevel,
  ApplicationMode,
  type DiscountTable
} from '@/persistence/entities/discount';

export const DefaultDiscountFixture = (): DiscountTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
  code: 'DISCOUNT10',
  application_mode: ApplicationMode.Code,
  application_level: ApplicationLevel.Order,
  per_customer_limit: null,
  starts_at: subDays(new Date(), 1),
  ends_at: null,
  enabled: true,
  combinable: false,
  handler: {},
  shop_id: crypto.randomUUID()
});
