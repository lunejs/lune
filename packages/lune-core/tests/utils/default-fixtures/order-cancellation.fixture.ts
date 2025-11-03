import type { OrderCancellationTable } from '@/persistence/entities/order-cancellation';

export const DefaultOrderCancellationFixture = (): OrderCancellationTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  reason: 'Customer requested cancellation',
  order_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
