import type { InStorePickupTable } from '@/persistence/entities/in-store-pickup';

export const DefaultInStorePickupFixture = (): InStorePickupTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  isAvailable: true,
  instructions: 'Please come to the front desk and show your order confirmation.',
  location_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
