import { PaymentHandler } from '@/config/payment-handler/payment-handler';
import { PaymentState } from '@/persistence/entities/payment';

export const TestPaymentHandler = new PaymentHandler({
  name: 'Test payment handler',
  code: 'test-payment-handler',
  args: {
    state: {
      type: 'text'
    }
  },
  async createPayment(_order, totalAmount, args, _ctx) {
    const paymentState = args.state as PaymentState;

    if (paymentState === PaymentState.Failed) {
      return {
        status: paymentState,
        reason: 'Payment provider failed'
      };
    }

    if (paymentState === PaymentState.Captured) {
      return {
        status: paymentState,
        amount: totalAmount,
        transactionId: crypto.randomUUID()
      };
    }

    if (
      paymentState === PaymentState.Pending ||
      paymentState === PaymentState.Submitted ||
      paymentState === PaymentState.Authorized
    ) {
      return {
        status: paymentState,
        amount: totalAmount
      };
    }

    return {
      status: PaymentState.Failed,
      reason: 'Payment state not supported'
    };
  }
});
