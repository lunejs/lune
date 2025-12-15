import { customAlphabet } from 'nanoid';

import { PaymentState } from '@/persistence/entities/payment';

import { PaymentHandler } from './payment-handler';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
    const transactionId = `tid_${customAlphabet(alphabet, 8)()}`;

    return {
      status: PaymentState.Captured,
      amount: totalAmount,
      transactionId
    };
  }
});
