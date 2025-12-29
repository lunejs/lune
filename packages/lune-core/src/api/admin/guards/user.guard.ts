import type { ExecutionContext } from '@/api/shared/context/types';
import { UnauthorizedError } from '@/api/shared/errors/api.errors';
import type { GraphQLFieldResolver } from '@/api/shared/graphql-api';

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
