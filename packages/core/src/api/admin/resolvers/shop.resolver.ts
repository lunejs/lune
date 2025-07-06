import { ExecutionContext } from '@/api/shared/context/types';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import { MutationCreateShopArgs } from '@/api/shared/types/graphql';
import { ShopService } from '@/business/shop/shop.service';
import { isErrorResult } from '@/utils/error-result';

async function createShop(_, { input }: MutationCreateShopArgs, ctx: ExecutionContext) {
  const shopService = new ShopService(ctx);

  const result = await shopService.create(input);

  return isErrorResult(result) ? { apiErrors: [result] } : { shop: result, apiErrors: [] };
}

export const ShopResolver = {
  Mutation: {
    createShop: UseUserGuard(createShop)
  }
};
