import {
  type CustomerAuthMethodTable,
  CustomerAuthProvider
} from '@/persistence/entities/customer-auth-method';

export const DefaultCustomerAuthMethodFixture = (): CustomerAuthMethodTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  provider: CustomerAuthProvider.Credentials,
  provider_id: null,
  password: null,
  customer_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
