import type { PaymentRejectionTable } from '@/persistence/entities/payment-rejection';

export const DefaultPaymentRejectionFixture = (): PaymentRejectionTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  reason: 'Invalid payment proof',
  payment_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
