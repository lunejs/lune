import type { ExecutionContext } from '@/api/shared/context/types';
import { UnauthorizedError } from '@/api/shared/errors/api.errors';
import type { GraphQLFieldResolver } from '@/api/shared/graphql-api';

export const UseCustomerGuard =
  (resolver: GraphQLFieldResolver) =>
  async (parent: unknown, args: unknown, ctx: ExecutionContext, info: unknown) => {
    const currentCustomer = ctx.storefront?.currentCustomer;

    if (!currentCustomer) {
      throw new UnauthorizedError('Invalid access token');
    }

    const customer = await ctx.repositories.customer.findOne({
      where: { id: currentCustomer.id }
    });

    if (!customer || !customer.enabled) {
      throw new UnauthorizedError('Invalid access token');
    }

    return resolver(parent, args, ctx, info);
  };
