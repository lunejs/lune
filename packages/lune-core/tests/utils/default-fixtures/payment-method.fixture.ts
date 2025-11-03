import type { PaymentMethodTable } from '@/persistence/entities/payment-method';

export const DefaultPaymentMethodFixture = (): PaymentMethodTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  enabled: true,
  name: '',
  handler: {},
  shop_id: crypto.randomUUID()
});
