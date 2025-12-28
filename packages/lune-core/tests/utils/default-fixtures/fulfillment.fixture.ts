import {
  FulfillmentState,
  type FulfillmentTable,
  FulfillmentType
} from '@/persistence/entities/fulfillment';

export const DefaultFulfillmentFixture = (): FulfillmentTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  code: '#F001',
  total_quantity: 1,
  state: FulfillmentState.Pending,
  metadata: null,
  type: FulfillmentType.Shipping,
  order_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
