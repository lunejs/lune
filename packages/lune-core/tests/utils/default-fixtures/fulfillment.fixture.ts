import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';

export const DefaultFulfillmentFixture = (): DeliveryMethodTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  type: 'SHIPPING' as any,
  amount: 10_00,
  total: 10_00,
  order_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
