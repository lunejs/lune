import type { DiscountUsageTable } from '@/persistence/entities/discount-usage';

export const DefaultDiscountUsageFixture = (): DiscountUsageTable => ({
  applied_at: new Date(),
  discount_id: crypto.randomUUID(),
  customer_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
