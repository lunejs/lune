import { PaymentState } from '@/persistence/entities/payment';

import { PaymentHandler } from './payment-handler';

export const DummyPaymentHandler = new PaymentHandler({
  name: 'Dummy Payment Handler',
  code: 'dummy-payment-handler',
  args: {
    sk: {
      type: 'text',
      required: true,
      label: 'Secret Key',
      placeholder: 'sk_16273...'
    }
  },
  async createPayment(_order, totalAmount, _args, _ctx) {
    return {
      status: PaymentState.Captured,
      amount: totalAmount,
      transactionId: `TEST-${crypto.randomUUID()}`
    };
  }
});
