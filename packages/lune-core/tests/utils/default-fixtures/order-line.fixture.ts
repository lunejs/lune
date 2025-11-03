import type { OrderLineTable } from '@/persistence/entities/order-line';

export const DefaultOrderLineFixture = (): OrderLineTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  line_subtotal: 0,
  line_total: 0,
  unit_price: 0,
  variant_id: crypto.randomUUID(),
  order_id: crypto.randomUUID()
});
