import { ExecutionContext } from '../context/types';
import { GraphQLFieldResolver } from '../graphql-api';
import { UnauthorizedError } from '../errors/api.errors';

export const UseUserGuard =
  (resolver: GraphQLFieldResolver) =>
  async (parent: unknown, args: unknown, ctx: ExecutionContext, info: unknown) => {
    if (!ctx.currentUser) {
      throw new UnauthorizedError('Invalid access token');
    }

    const user = await ctx.repositories.user.findById(ctx.currentUser.id);

    if (!user) {
      throw new UnauthorizedError('Invalid access token');
    }

    return resolver(parent, args, ctx, info);
  };
