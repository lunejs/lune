import type { JwtService } from '@/libs/jwt';
import { Logger } from '@/logger';
import type { Database } from '@/persistence/connection';
import { buildRepositories } from '@/persistence/repositories/build-repositories';
import { enableRLS, runWithoutRLS } from '@/persistence/rls';

import { buildLoaders } from '../loaders/build-loaders';
import type { UserJWT } from '../types/api.types';

import type { ExecutionContext, StorefrontContext } from './types';

export async function buildContext(input: Input): Promise<ExecutionContext> {
  try {
    const { database, jwtService, shopId, userJWT, storefront } = input;

    const trx = await database.transaction();

    await enableRLS({ trx, shopId, ownerId: userJWT?.sub ?? null });

    const ownerId = userJWT?.sub ?? null;

    return {
      trx,
      shopId,
      jwtService,
      runWithoutRLS: runWithoutRLS(trx, shopId, ownerId),
      ownerId,
      currentUser: userJWT ? { id: userJWT.sub, email: userJWT.email } : null,
      repositories: buildRepositories(trx),
      loaders: buildLoaders(trx, storefront?.locale, input.variables),
      storefront
    };
  } catch (error) {
    Logger.error('BuildContext', 'Failed to build GraphQL context', error);
    throw error;
  }
}

type Input = {
  database: Database;
  jwtService: JwtService;
  shopId: string | null;
  userJWT: UserJWT | null;
  variables?: Record<string, unknown>;
  storefront?: StorefrontContext;
};
