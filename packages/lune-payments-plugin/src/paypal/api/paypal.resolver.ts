import type { ExecutionContext, GraphqlApiResolver } from '@lune/core';

import { PayPal } from '../adapters/paypal';
import { PaypalServiceError } from '../business/paypal.errors';
import { PaypalService } from '../business/paypal.service';

import type { MutationCreatePaypalOrderArgs } from './types.api';

async function createPaypalOrder(
  _: unknown,
  { orderId }: MutationCreatePaypalOrderArgs,
  ctx: ExecutionContext
) {
  const paypalService = new PaypalService(ctx, new PayPal());

  const result = await paypalService.createOrder(orderId);

  if (result instanceof PaypalServiceError) return { apiErrors: [result] };

  return { orderId: result.id };
}

export const PayPalResolver: GraphqlApiResolver = {
  Mutation: {
    createPaypalOrder
  }
};
