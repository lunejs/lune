import type { ShippingFulfillmentTable } from '@/persistence/entities/shipping-fulfillment';

export const DefaultShippingFulfillmentFixture = (): ShippingFulfillmentTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  method: 'Express',
  tracking_code: null,
  carrier: null,
  shipped_at: null,
  delivered_at: null,
  fulfillment_id: crypto.randomUUID(),
  shipping_method_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
