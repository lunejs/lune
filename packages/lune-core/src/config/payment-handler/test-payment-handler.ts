import type { ExecutionContext } from '@/api/shared/context/types';
import type { Order } from '@/persistence/entities/order';
import { PaymentState } from '@/persistence/entities/payment';

import type { Args } from '../common/args.config';

import type { CreatePaymentResult, PaymentHandler } from './payment-handler';

export class TestPaymentHandler implements PaymentHandler {
  name = 'Test payment handler';
  code = 'test-payment-handler';
  args: Args = {
    sk: {
      type: 'text',
      required: true,
      label: 'Secret Key',
      placeholder: 'sk_16273...'
    }
  };

  async createPayment(
    _: Order,
    totalAmount: number,
    __: ExecutionContext
  ): Promise<CreatePaymentResult> {
    return {
      status: PaymentState.Captured,
      amount: totalAmount,
      transactionId: `TEST-${crypto.randomUUID()}`
    };
  }
}
