import type { JwtService } from '@/libs/jwt';
import { Logger } from '@/logger';
import type { Database } from '@/persistence/connection';
import { buildRepositories } from '@/persistence/repositories/build-repositories';
import { enableRLS, runWithoutRLS } from '@/persistence/rls';

import { buildLoaders } from '../loaders/build-loaders';
import type { UserJWT } from '../types/api.types';

import type { ExecutionContext, StorefrontContext } from './types';

export async function buildContext(
  database: Database,
  jwtService: JwtService,
  shopId: string | null,
  userJwt: UserJWT | null,
  storefront?: StorefrontContext
): Promise<ExecutionContext> {
  try {
    const trx = await database.transaction();

    await enableRLS({ trx, shopId, ownerId: userJwt?.sub ?? null });

    const ownerId = userJwt?.sub ?? null;

    return {
      trx,
      shopId,
      jwtService,
      runWithoutRLS: runWithoutRLS(trx, shopId, ownerId),
      ownerId,
      currentUser: userJwt ? { id: userJwt.sub, email: userJwt.email } : null,
      repositories: buildRepositories(trx),
      loaders: buildLoaders(trx, storefront?.locale),
      storefront
    };
  } catch (error) {
    Logger.error('BuildContext', 'Failed to build GraphQL context', error);
    throw error;
  }
}
