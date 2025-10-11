import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type { MutationCreateVariantArgs } from '@/api/shared/types/graphql';
import { VariantService } from '@/business/variant/variant.service';

async function createVariant(
  _,
  { productId, input }: MutationCreateVariantArgs,
  ctx: ExecutionContext
) {
  const variantService = new VariantService(ctx);

  return variantService.create(productId, input);
}

export const VariantResolver: GraphqlApiResolver = {
  Mutation: {
    createVariant: UseUserGuard(createVariant)
  }
};
