import type { PaymentCancellationTable } from '@/persistence/entities/payment-cancellation';

export const DefaultPaymentCancellationFixture = (): PaymentCancellationTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  reason: 'Order canceled because the is not enough stock',
  payment_id: crypto.randomUUID(),
  shop_id: crypto.randomUUID()
});
