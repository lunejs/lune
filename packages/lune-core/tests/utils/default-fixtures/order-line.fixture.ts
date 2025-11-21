import type { OrderLineTable } from '@/persistence/entities/order-line';

export const DefaultOrderLineFixture = (): OrderLineTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  line_subtotal: 0,
  line_total: 0,
  unit_price: 0,
  quantity: 0,
  applied_discounts: JSON.stringify([]),
  variant_id: crypto.randomUUID(),
  order_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
