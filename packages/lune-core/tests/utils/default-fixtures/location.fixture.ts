import type { LocationTable } from '@/persistence/entities/location';

export const DefaultLocationFixture = (): LocationTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: 'Main Store',
  street_line_1: '123 Main Street',
  street_line_2: null,
  city: 'San Francisco',
  postal_code: '94102',
  phone_number: '+14155551234',
  references: null,
  enabled: true,
  country_id: crypto.randomUUID(),
  state_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
