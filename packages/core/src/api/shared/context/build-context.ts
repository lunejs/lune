import { Database } from '@/persistence/connection';
import { YogaInitialContext } from 'graphql-yoga';
import { ExecutionContext } from './types';
import { buildRepositories } from '@/persistence/repositories/build-repositories';
import { JwtService } from '@/libs/jwt';
import { UserJWT } from '../types/api.types';
import { Logger } from '@/logger';
import { runWithoutRLS } from '@/persistence/rls';

export async function buildContext(
  initialContext: YogaInitialContext,
  database: Database,
  jwtService: JwtService
): Promise<ExecutionContext> {
  try {
    const rawHeader = initialContext.request.headers.get('authorization') ?? '';

    const shopId = initialContext.request.headers.get('x_vendyx_shop_id');
    const token = rawHeader.startsWith('Bearer ') ? rawHeader.replace('Bearer ', '') : '';

    const payload = token ? await jwtService.verifyToken<UserJWT>(token) : null;

    const trx = await database.transaction();

    await trx.raw(`SELECT set_config('app.current_shop_id', '${shopId}', TRUE)`);
    await trx.raw(
      `SELECT set_config('app.current_owner_id', '${payload?.sub ?? '00000000-0000-0000-0000-000000000000'}', TRUE)`
    );

    const ownerId = payload?.sub ?? null;

    return {
      trx,
      shopId,
      jwtService,
      runWithoutRLS: runWithoutRLS(trx, shopId, ownerId),
      ownerId,
      currentUser: payload ? { id: payload.sub, email: payload.email } : null,
      repositories: buildRepositories(trx)
    };
  } catch (error) {
    Logger.error('BuildContext', 'Failed to build GraphQL context', error);
    throw error;
  }
}
