import type { DeliveryMethodShippingTable } from '@/persistence/entities/delivery-method-shipping';

export const DefaultDeliveryMethodShippingFixture = (): DeliveryMethodShippingTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  method: 'Express',
  delivery_method_id: crypto.randomUUID(),
  shipping_method_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
