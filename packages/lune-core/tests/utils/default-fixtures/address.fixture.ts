import type { AddressTable } from '@/persistence/entities/address';

export const DefaultAddressFixture = (): AddressTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  full_name: 'John Doe',
  street_line_1: '123 Main St',
  street_line_2: null,
  city: 'Test City',
  postal_code: '12345',
  phone_number: '+1234567890',
  is_default: false,
  references: null,
  country_id: crypto.randomUUID(),
  state_id: crypto.randomUUID(),
  customer_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
