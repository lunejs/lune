import type { FulfillmentLineTable } from '@/persistence/entities/fulfillment-line';

export const DefaultFulfillmentLineFixture = (): FulfillmentLineTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  quantity: 1,
  fulfillment_id: crypto.randomUUID(),
  order_line_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
