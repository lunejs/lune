import { PaymentHandler, PaymentState } from '@lune/core';

import { PayPal } from './adapters/paypal';
import { PaypalServiceError } from './business/paypal.errors';
import { PayPalService } from './business/paypal.service';

export const paypalHandler = new PaymentHandler({
  name: 'PayPal',
  code: 'paypal',
  args: {},
  async createPayment(
    _order,
    totalAmount,
    _args,
    ctx,
    metadata: PayPalHandlerMetadata | undefined
  ) {
    if (!metadata?.paypalOrderId) {
      return {
        status: PaymentState.Failed,
        reason: 'PayPal order id is required'
      };
    }

    const paypalService = new PayPalService(ctx, new PayPal());

    const result = await paypalService.capturePayment(metadata.paypalOrderId);

    if (result instanceof PaypalServiceError) {
      return {
        status: PaymentState.Failed,
        reason: result.message
      };
    }

    return {
      status: PaymentState.Captured,
      amount: totalAmount,
      transactionId: result.invoiceId
    };
  }
});

type PayPalHandlerMetadata = {
  paypalOrderId?: string;
};
