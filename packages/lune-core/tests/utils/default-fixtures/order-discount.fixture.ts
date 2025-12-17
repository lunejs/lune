import type { OrderDiscountTable } from '@/persistence/entities/order-discount';

export const DefaultOrderDiscountFixture = (): OrderDiscountTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  discounted_amount: 1000,
  discount_id: crypto.randomUUID(),
  order_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
