import type { ShippingFulfillmentTable } from '@/persistence/entities/shipping-fulfillment';

export const DefaultShippingFulfillmentFixture = (): ShippingFulfillmentTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  tracking_code: '1Z999AA10123456784',
  carrier: 'UPS',
  shipped_at: new Date(),
  delivered_at: new Date(),
  fulfillment_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
