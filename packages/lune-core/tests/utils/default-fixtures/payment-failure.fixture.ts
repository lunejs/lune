import type { PaymentFailureTable } from '@/persistence/entities/payment-failure';

export const DefaultPaymentFailureFixture = (): PaymentFailureTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  reason: 'Payment declined',
  payment_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
