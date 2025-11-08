import type { ShippingMethodTable } from '@/persistence/entities/shipping-method';

export const DefaultShippingMethodFixture = (): ShippingMethodTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  handler: {},
  enabled: true,
  zone_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
