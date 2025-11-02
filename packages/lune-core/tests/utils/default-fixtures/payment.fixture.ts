import type { PaymentTable } from '@/persistence/entities/payment';

export const DefaultPaymentFixture = (): PaymentTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  transaction_id: null,
  amount: 100_00,
  method: 'stripe',
  shop_id: crypto.randomUUID()
});
