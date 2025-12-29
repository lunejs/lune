import { UseUserGuard } from '@/api/admin/guards/user.guard';
import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonVariantFieldResolver } from '@/api/shared/resolvers/variant-field.resolver';
import type {
  MutationCreateVariantArgs,
  MutationSoftRemoveVariantArgs,
  MutationUpdateVariantArgs
} from '@/api/shared/types/graphql';
import { VariantService } from '@/business/variant/variant.service';

async function createVariant(
  _,
  { productId, input }: MutationCreateVariantArgs,
  ctx: ExecutionContext
) {
  const variantService = new VariantService(ctx);

  return variantService.create(productId, input);
}

async function updateVariant(_, { id, input }: MutationUpdateVariantArgs, ctx: ExecutionContext) {
  const variantService = new VariantService(ctx);

  return variantService.update(id, input);
}

async function softRemoveVariant(_, { id }: MutationSoftRemoveVariantArgs, ctx: ExecutionContext) {
  const variantService = new VariantService(ctx);

  return variantService.softRemove(id);
}

export const VariantResolver: GraphqlApiResolver = {
  Mutation: {
    createVariant: UseUserGuard(createVariant),
    updateVariant: UseUserGuard(updateVariant),
    softRemoveVariant: UseUserGuard(softRemoveVariant)
  },
  Variant: {
    ...CommonVariantFieldResolver
  }
};
