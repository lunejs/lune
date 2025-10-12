import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationCreateVariantArgs,
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

export const VariantResolver: GraphqlApiResolver = {
  Mutation: {
    createVariant: UseUserGuard(createVariant),
    updateVariant: UseUserGuard(updateVariant)
  }
};
