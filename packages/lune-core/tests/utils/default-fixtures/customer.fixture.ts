import type { CustomerTable } from '@/persistence/entities/customer';

export const DefaultCustomerFixture = (): CustomerTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  first_name: null,
  last_name: '',
  email: `${crypto.randomUUID()}@test.com`,
  password: null,
  phone_number: null,
  enabled: true,
  shop_id: crypto.randomUUID()
});
