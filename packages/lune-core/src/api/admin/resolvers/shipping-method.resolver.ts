import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationCreateShippingMethodArgs,
  MutationRemoveShippingMethodArgs,
  MutationUpdateShippingMethodArgs
} from '@/api/shared/types/graphql';
import { ShippingMethodService } from '@/business/shipping-method/shipping-method.service';

async function shippingMethods(_, __, ctx: ExecutionContext) {
  const shippingMethodService = new ShippingMethodService(ctx);

  return shippingMethodService.find();
}

async function createShippingMethod(
  _,
  { input }: MutationCreateShippingMethodArgs,
  ctx: ExecutionContext
) {
  const shippingMethodService = new ShippingMethodService(ctx);

  return shippingMethodService.create(input);
}

async function updateShippingMethod(
  _,
  { id, input }: MutationUpdateShippingMethodArgs,
  ctx: ExecutionContext
) {
  const shippingMethodService = new ShippingMethodService(ctx);

  return shippingMethodService.update(id, input);
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
    shippingMethods: UseUserGuard(shippingMethods)
  },
  Mutation: {
    createShippingMethod: UseUserGuard(createShippingMethod),
    updateShippingMethod: UseUserGuard(updateShippingMethod),
    removeShippingMethod: UseUserGuard(removeShippingMethod)
  }
};
