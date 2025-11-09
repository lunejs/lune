import type { ExecutionContext } from '@/api/shared/context/types';
import type { Order } from '@/persistence/entities/order';
import { PaymentState } from '@/persistence/entities/payment';

import type { CreatePaymentResult, PaymentHandler } from './payment-handler';

export class TestPaymentHandler implements PaymentHandler {
  name = 'Test payment handler';
  code = 'test-payment-handler';

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
