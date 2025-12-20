import { vi, vitest } from 'vitest';

import type { ExecutionContext } from '@lune/core';

import type { PayPal } from '../../adapters/paypal';
import { OrderNotFoundError, PaypalRequestError } from '../paypal.errors';
import { PaypalService } from '../paypal.service';

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

      const paypalService = new PaypalService(
        ctx as unknown as ExecutionContext,
        paypal as unknown as PayPal
      );

      await paypalService.createOrder('non-existing-id');

      expect(paypal.createOrder).toHaveBeenCalledTimes(1);
      expect(paypal.createOrder).toHaveBeenCalledWith(SHIPPING_ORDER_PAYLOAD_RESULT);
    });

    test('returns OrderNotFoundError when order was not found', async () => {
      const paypalService = new PaypalService(
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

      const paypalService = new PaypalService(
        ctx as unknown as ExecutionContext,
        paypal as unknown as PayPal
      );

      const result = await paypalService.createOrder('non-existing-id');

      expect(result).toBeInstanceOf(PaypalRequestError);
    });
  });
});
