import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationCreatePaymentMethodArgs,
  MutationRemovePaymentMethodArgs,
  MutationUpdatePaymentMethodArgs
} from '@/api/shared/types/graphql';
import { PaymentMethodService } from '@/business/payment-method/payment.service';
import { isErrorResult } from '@/utils/error-result';

async function paymentMethods(_, __, ctx: ExecutionContext) {
  const paymentMethodService = new PaymentMethodService(ctx);

  return paymentMethodService.find();
}

async function paymentHandlers(_, __, ctx: ExecutionContext) {
  const paymentMethodService = new PaymentMethodService(ctx);

  return paymentMethodService.findHandlers();
}

async function createPaymentMethod(
  _,
  { input }: MutationCreatePaymentMethodArgs,
  ctx: ExecutionContext
) {
  const paymentMethodService = new PaymentMethodService(ctx);

  const result = await paymentMethodService.create(input);

  return isErrorResult(result)
    ? { paymentMethod: null, apiErrors: [result] }
    : { paymentMethod: result, apiErrors: [] };
}

async function updatePaymentMethod(
  _,
  { id, input }: MutationUpdatePaymentMethodArgs,
  ctx: ExecutionContext
) {
  const paymentMethodService = new PaymentMethodService(ctx);

  return await paymentMethodService.update(id, input);
}

async function removePaymentMethod(
  _,
  { id }: MutationRemovePaymentMethodArgs,
  ctx: ExecutionContext
) {
  const paymentMethodService = new PaymentMethodService(ctx);

  return paymentMethodService.remove(id);
}

export const PaymentMethodResolver: GraphqlApiResolver = {
  Query: {
    paymentMethods: UseUserGuard(paymentMethods),
    paymentHandlers: UseUserGuard(paymentHandlers)
  },
  Mutation: {
    createPaymentMethod: UseUserGuard(createPaymentMethod),
    updatePaymentMethod: UseUserGuard(updatePaymentMethod),
    removePaymentMethod: UseUserGuard(removePaymentMethod)
  }
};
