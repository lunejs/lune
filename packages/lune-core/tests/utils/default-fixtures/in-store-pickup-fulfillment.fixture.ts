import type { InStorePickupFulfillmentTable } from '@/persistence/entities/in-store-pickup-fulfillment';

export const DefaultInStorePickupFulfillmentFixture = (): InStorePickupFulfillmentTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  address: {
    fullName: 'John Doe',
    streetLine1: '123 Main St',
    city: 'San Francisco',
    postalCode: '94102',
    phoneNumber: '+14155551234'
  },
  ready_at: new Date(),
  picked_up_at: new Date(),
  fulfillment_id: crypto.randomUUID(),
  location_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
