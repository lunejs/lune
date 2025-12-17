import type { ExecutionContext } from '../context/types';
import { UnauthorizedError } from '../errors/api.errors';
import type { GraphQLFieldResolver } from '../graphql-api';

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
