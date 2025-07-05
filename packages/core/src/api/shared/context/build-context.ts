import { Database } from '@/persistence/connection';
import { YogaInitialContext } from 'graphql-yoga';
import { GraphqlContext } from './types';
import { buildRepositories } from '@/persistence/repositories/build-repositories';
import { JwtService } from '@/libs/jwt';
import { UserJWT } from '../types/api.types';
import { Logger } from '@/logger';

const SHOP_ID_PLACEHOLDER = '00000000-0000-0000-0000-000000000000';

export async function buildContext(
  initialContext: YogaInitialContext,
  database: Database,
  jwtService: JwtService
): Promise<GraphqlContext> {
  try {
    const rawHeader = initialContext.request.headers.get('authorization') ?? '';

    const shopId = initialContext.request.headers.get('x_vendyx_shop_id') || SHOP_ID_PLACEHOLDER;
    const token = rawHeader.startsWith('Bearer ') ? rawHeader.replace('Bearer ', '') : '';

    const payload = token ? await jwtService.verifyToken<UserJWT>(token) : null;

    const trx = await database.transaction();

    await trx.raw(`SELECT set_config('app.current_shop_id', '${shopId}', TRUE)`);

    return {
      trx,
      shopId,
      jwtService,
      currentUser: payload ? { id: payload.sub, email: payload.email } : null,
      repositories: buildRepositories(trx)
    };
  } catch (error) {
    Logger.error('BuildContext', 'Failed to build GraphQL context', error);
    throw error;
  }
}
