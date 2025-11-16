import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationCreateShippingMethodArgs,
  MutationRemoveShippingMethodArgs,
  MutationUpdateShippingMethodArgs
} from '@/api/shared/types/graphql';
import { ShippingMethodService } from '@/business/shipping-method/shipping-method.service';
import { getConfig } from '@/config/config';
import type { ShippingMethod } from '@/persistence/entities/shipping-method';
import { isErrorResult } from '@/utils/error-result';

async function shippingMethods(_, __, ctx: ExecutionContext) {
  const shippingMethodService = new ShippingMethodService(ctx);

  return shippingMethodService.find();
}

async function shippingHandlers(_, __, ctx: ExecutionContext) {
  const shippingMethodService = new ShippingMethodService(ctx);

  return shippingMethodService.findHandlers();
}

async function createShippingMethod(
  _,
  { input }: MutationCreateShippingMethodArgs,
  ctx: ExecutionContext
) {
  const shippingMethodService = new ShippingMethodService(ctx);

  const result = await shippingMethodService.create(input);

  return isErrorResult(result)
    ? { shippingMethod: null, apiErrors: [result] }
    : { shippingMethod: result, apiErrors: [] };
}

async function updateShippingMethod(
  _,
  { id, input }: MutationUpdateShippingMethodArgs,
  ctx: ExecutionContext
) {
  const shippingMethodService = new ShippingMethodService(ctx);

  return await shippingMethodService.update(id, input);
}

async function removeShippingMethod(
  _,
  { id }: MutationRemoveShippingMethodArgs,
  ctx: ExecutionContext
) {
  const shippingMethodService = new ShippingMethodService(ctx);

  return shippingMethodService.remove(id);
}

export const ShippingMethodResolver: GraphqlApiResolver = {
  Query: {
    shippingMethods: UseUserGuard(shippingMethods),
    shippingHandlers: UseUserGuard(shippingHandlers)
  },
  Mutation: {
    createShippingMethod: UseUserGuard(createShippingMethod),
    updateShippingMethod: UseUserGuard(updateShippingMethod),
    removeShippingMethod: UseUserGuard(removeShippingMethod)
  },
  ShippingMethod: {
    pricePreview: (parent: ShippingMethod, _, ctx: ExecutionContext) => {
      const shippingHandler = getConfig().shipping.handlers.find(
        p => p.code === parent.handler.code
      );

      // TODO: This is supposed to be always true, a shipping method should always have a price calculator.
      // But sometimes the shipping method is created and later in the code the price calculator is removed.
      // This is a temporary fix, we should refactor the code to avoid this situation.
      if (!shippingHandler) return;

      const pricePreview = shippingHandler.getPricePreview(parent.handler.args, ctx);

      return pricePreview;
    }
  }
};
