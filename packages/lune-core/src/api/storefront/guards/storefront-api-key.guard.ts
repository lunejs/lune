import type { ExecutionContext } from '@/api/shared/context/types';
import { UnauthorizedError } from '@/api/shared/errors/api.errors';
import type { GraphQLFieldResolver } from '@/api/shared/graphql-api';

export const UseStorefrontApiKeyGuard =
  (resolver: GraphQLFieldResolver) =>
  async (parent: unknown, args: unknown, ctx: ExecutionContext, info: unknown) => {
    if (!ctx.storefront?.apiKey) {
      throw new UnauthorizedError('Missing storefront API key');
    }

    const isValidKey = await ctx.repositories.shop.findOne({
      where: { storefrontApiKey: ctx.storefront.apiKey }
    });

    if (!isValidKey) {
      throw new UnauthorizedError('Invalid storefront API key');
    }

    return resolver(parent, args, ctx, info);
  };
