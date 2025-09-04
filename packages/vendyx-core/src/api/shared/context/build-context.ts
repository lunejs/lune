import { JwtService } from '@/libs/jwt';
import { Logger } from '@/logger';
import { Database } from '@/persistence/connection';
import { buildRepositories } from '@/persistence/repositories/build-repositories';
import { enableRLS, runWithoutRLS } from '@/persistence/rls';

import { UserJWT } from '../types/api.types';

import { ExecutionContext } from './types';

export async function buildContext(
  database: Database,
  jwtService: JwtService,
  shopId: string | null,
  userJwt: UserJWT | null
): Promise<ExecutionContext> {
  try {
    // const rawHeader = request.headers.get('authorization') ?? '';

    // const shopId = request.headers.get('x_vendyx_shop_id');
    // const token = rawHeader.startsWith('Bearer ') ? rawHeader.replace('Bearer ', '') : '';

    // const payload = token ? await jwtService.verifyToken<UserJWT>(token) : null;

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
      repositories: buildRepositories(trx)
    };
  } catch (error) {
    Logger.error('BuildContext', 'Failed to build GraphQL context', error);
    throw error;
  }
}
