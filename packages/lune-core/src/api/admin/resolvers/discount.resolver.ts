import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import {
  DiscountApplicationLevel,
  type DiscountHandler,
  type QueryDiscountArgs,
  type QueryDiscountsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { DiscountService } from '@/business/discount/discount.service';
import { FulfillmentDiscountHandler } from '@/config/discounts/fulfillment-discount-handler';
import { OrderDiscountHandler } from '@/config/discounts/order-discount-handler';
import { OrderLineDiscountHandler } from '@/config/discounts/order-line-discount-handler';

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

async function discountHandlers(_, __, ctx: ExecutionContext) {
  const discountService = new DiscountService(ctx);

  return discountService.findHandlers();
}

export const DiscountResolver: GraphqlApiResolver = {
  Query: {
    discounts: UseUserGuard(discounts),
    discount: UseUserGuard(discount),
    discountHandlers: UseUserGuard(discountHandlers)
  },
  DiscountHandler: {
    applicationLevel: async (parent: DiscountHandler) => {
      if (parent instanceof OrderDiscountHandler) return DiscountApplicationLevel.Order;
      if (parent instanceof OrderLineDiscountHandler) return DiscountApplicationLevel.OrderLine;
      if (parent instanceof FulfillmentDiscountHandler) return DiscountApplicationLevel.Fulfillment;
    }
  }
};
