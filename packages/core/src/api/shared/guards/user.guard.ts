import { GraphqlContext } from '../context/types';
import { GraphQLFieldResolver } from '../graphql-api';
import { UnauthorizedError } from '../errors/api.errors';

export const UseUserGuard =
  (resolver: GraphQLFieldResolver) =>
  (parent: unknown, args: unknown, ctx: GraphqlContext, info: unknown) => {
    if (!ctx.currentUser) {
      throw new UnauthorizedError('Invalid access token');
    }

    return resolver(parent, args, ctx, info);
  };
