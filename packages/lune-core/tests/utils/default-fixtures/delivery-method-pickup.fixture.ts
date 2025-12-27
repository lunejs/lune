import type { DeliveryMethodPickupTable } from '@/persistence/entities/delivery-method-pickup';

export const DefaultDeliveryMethodPickupFixture = (): DeliveryMethodPickupTable => ({
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
  delivery_method_id: crypto.randomUUID(),
  location_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
