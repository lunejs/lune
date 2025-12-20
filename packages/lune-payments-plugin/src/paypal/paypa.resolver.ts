import { ExecutionContext, GraphqlApiResolver } from '@lune/core';
import { MutationCreatePaypalOrderArgs } from './api.types';
import { PaypalService } from './paypal.service';
import { PaypalServiceError } from './paypal.errors';
import { PayPal } from './paypal';

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

export const PaypalResolver: GraphqlApiResolver = {
  Mutation: {
    createPaypalOrder
  }
};
