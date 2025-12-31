import type { ExecutionContext } from '@lunejs/core';
import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { vi, vitest } from 'vitest';

import type { PayPal } from '../../adapters/paypal';
import type { CreatePaypalOrderResponse } from '../../adapters/paypal.types';
import { OrderNotFoundError, PaypalRequestError } from '../paypal.errors';
import type { CapturePaymentResult } from '../paypal.service';
import { PayPalService } from '../paypal.service';

import { SHIPPING_ORDER, SHIPPING_ORDER_PAYLOAD_RESULT } from './paypal-service.fixtures';

const paypal = {
  createOrder: vi.fn(),
  capturePayment: vi.fn(),
  getOrderDetails: vi.fn()
};

const ctx = {
  repositories: { order: { findOneWithDetails: vi.fn() } }
};

describe('PaypalService', () => {
  beforeEach(() => {
    vitest.resetAllMocks();
  });

  describe('createOrder', () => {
    test('calls paypal.createOrder with correct payload when order is found', async () => {
      ctx.repositories.order.findOneWithDetails.mockReturnValue(SHIPPING_ORDER);

      const paypalService = new PayPalService(
        ctx as unknown as ExecutionContext,
        paypal as unknown as PayPal
      );

      await paypalService.createOrder('non-existing-id');

      expect(paypal.createOrder).toHaveBeenCalledTimes(1);
      expect(paypal.createOrder).toHaveBeenCalledWith(SHIPPING_ORDER_PAYLOAD_RESULT);
    });

    test('returns paypal order when order is found', async () => {
      ctx.repositories.order.findOneWithDetails.mockReturnValue(SHIPPING_ORDER);
      paypal.createOrder.mockReturnValue({ id: 'paypal-order-id' });

      const paypalService = new PayPalService(
        ctx as unknown as ExecutionContext,
        paypal as unknown as PayPal
      );

      const result = await paypalService.createOrder('non-existing-id');

      expect((result as CreatePaypalOrderResponse).id).toBe('paypal-order-id');
    });

    test('returns OrderNotFoundError when order was not found', async () => {
      const paypalService = new PayPalService(
        ctx as unknown as ExecutionContext,
        paypal as unknown as PayPal
      );

      const result = await paypalService.createOrder('non-existing-id');

      expect(result).toBeInstanceOf(OrderNotFoundError);
      expect(paypal.createOrder).not.toHaveBeenCalled();
    });

    test('returns PaypalRequestError when paypal.createOrder throws an error', async () => {
      ctx.repositories.order.findOneWithDetails.mockReturnValue(SHIPPING_ORDER);
      paypal.createOrder.mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      const paypalService = new PayPalService(
        ctx as unknown as ExecutionContext,
        paypal as unknown as PayPal
      );

      const result = await paypalService.createOrder('non-existing-id');

      expect(result).toBeInstanceOf(PaypalRequestError);
    });
  });

  describe('capturePayment', () => {
    test('returns invoice id when capture payment goes well', async () => {
      paypal.getOrderDetails.mockResolvedValue({
        purchase_units: [{ invoice_id: 'invoice id' }]
      });

      const paypalService = new PayPalService(
        ctx as unknown as ExecutionContext,
        paypal as unknown as PayPal
      );

      const result = await paypalService.capturePayment('paypal-order-id');

      expect(paypal.capturePayment).toHaveBeenCalledWith('paypal-order-id');
      expect(paypal.getOrderDetails).toHaveBeenCalledWith('paypal-order-id');

      expect((result as CapturePaymentResult).invoiceId).toBe('invoice id');
    });

    test('returns PaypalRequestError when a generic error is thrown', async () => {
      paypal.capturePayment.mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      const paypalService = new PayPalService(
        ctx as unknown as ExecutionContext,
        paypal as unknown as PayPal
      );

      const result = await paypalService.capturePayment('paypal-order-id');

      expect(result).toBeInstanceOf(PaypalRequestError);
    });

    test('returns PaypalRequestError with paypal reason when am axios error is thrown', async () => {
      paypal.capturePayment.mockImplementation(() => {
        throw new AxiosError('', '', undefined, undefined, {
          data: { message: 'PayPal error' }
        } as AxiosResponse);
      });

      const paypalService = new PayPalService(
        ctx as unknown as ExecutionContext,
        paypal as unknown as PayPal
      );

      const result = await paypalService.capturePayment('paypal-order-id');

      expect(result).toBeInstanceOf(PaypalRequestError);
      expect((result as PaypalRequestError).message).toBe('PayPal error');
    });
  });
});
