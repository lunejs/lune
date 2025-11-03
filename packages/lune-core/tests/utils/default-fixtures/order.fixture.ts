import { OrderState, type OrderTable } from '@/persistence/entities/order';

export const DefaultOrderFixture = (): OrderTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  code: null,
  state: OrderState.MODIFYING,
  total: 0,
  subtotal: 0,
  placed_at: null,
  completed_at: null,
  total_quantity: 0,
  shipping_address: null,
  customer_id: null,
  shop_id: crypto.randomUUID()
});
