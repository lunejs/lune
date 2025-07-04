import { Database } from '@/persistence/connection';
import { YogaInitialContext } from 'graphql-yoga';
import { GraphqlContext } from './types';
import { buildRepositories } from '@/persistence/repositories/build-repositories';
import { JwtService } from '@/libs/jwt';

const SHOP_ID_PLACEHOLDER = '00000000-0000-0000-0000-000000000000';

export async function buildContext(
  initialContext: YogaInitialContext,
  database: Database,
  jwtService: JwtService
): Promise<GraphqlContext> {
  const shopId = initialContext.request.headers.get('x_vendyx_shop_id') || SHOP_ID_PLACEHOLDER;

  const trx = await database.transaction();

  await trx.raw(`SELECT set_config('app.current_shop_id', '${shopId}', TRUE)`);

  return {
    trx,
    shopId,
    jwtService,
    repositories: buildRepositories(trx)
  };
}
