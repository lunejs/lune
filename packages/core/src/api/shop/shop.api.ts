import path from 'node:path';
import { GraphqlApi } from '../shared/graphql-api';
import { useTransaction } from '../shared/plugins/use-transaction';
import { Database } from '@/persistence/connection';
import { buildContext } from '../shared/context/build-context';
import { useErrorLogger } from '../shared/plugins/use-error-logger';
import { JwtService } from '@/libs/jwt';
import { useQueryLogger } from '../shared/plugins/use-query-logger';

const SHARED_TYPE_PATH = path.join(__dirname, '../shared/gql/**/*.gql');
const SHOP_TYPE_PATH = path.join(__dirname, './**/*.gql');

export class ShopApi extends GraphqlApi {
  constructor(database: Database, jwtService: JwtService) {
    super({
      endpoint: '/shop-api',
      typePaths: [SHOP_TYPE_PATH, SHARED_TYPE_PATH],
      resolvers: [],
      context: initialContext => buildContext(initialContext, database, jwtService),
      plugins: [useTransaction(), useErrorLogger(), useQueryLogger()]
    });
  }
}
