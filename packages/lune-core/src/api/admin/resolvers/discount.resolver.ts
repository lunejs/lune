import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type { QueryDiscountArgs, QueryDiscountsArgs } from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { DiscountService } from '@/business/discount/discount.service';

async function discounts(_, { input }: QueryDiscountsArgs, ctx: ExecutionContext) {
  const discountService = new DiscountService(ctx);

  const [discounts, count] = await Promise.all([
    discountService.find(input ?? {}),
    discountService.count(input?.filters)
  ]);

  return new ListResponse(discounts, discounts.length, { total: count });
}

async function discount(_, { id }: QueryDiscountArgs, ctx: ExecutionContext) {
  const discountService = new DiscountService(ctx);

  return discountService.findById(id);
}

export const DiscountResolver: GraphqlApiResolver = {
  Query: {
    discounts: UseUserGuard(discounts),
    discount: UseUserGuard(discount)
  }
};
