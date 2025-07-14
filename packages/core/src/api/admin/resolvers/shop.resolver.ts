import { ExecutionContext } from '@/api/shared/context/types';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import { MutationCreateShopArgs, QueryShopArgs, QueryShopsArgs } from '@/api/shared/types/graphql';
import { ShopService } from '@/business/shop/shop.service';
import { isErrorResult } from '@/utils/error-result';
import { ListResponse } from '@/utils/list-response';

async function createShop(_, { input }: MutationCreateShopArgs, ctx: ExecutionContext) {
  const shopService = new ShopService(ctx);

  const result = await shopService.create(input);

  return isErrorResult(result) ? { apiErrors: [result] } : { shop: result, apiErrors: [] };
}

async function shop(_, { slug }: QueryShopArgs, ctx: ExecutionContext) {
  const shopService = new ShopService(ctx);

  return shopService.findBySlug(slug);
}

async function shops(_, { input }: QueryShopsArgs, ctx: ExecutionContext) {
  const shopService = new ShopService(ctx);

  const [result, total] = await Promise.all([
    shopService.findAll(input ?? undefined),
    shopService.count()
  ]);

  return new ListResponse(result, result.length, { total });
}

export const ShopResolver = {
  Mutation: {
    createShop: UseUserGuard(createShop)
  },
  Query: {
    shop: UseUserGuard(shop),
    shops: UseUserGuard(shops)
  }
};
