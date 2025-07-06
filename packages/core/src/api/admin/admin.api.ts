import path from 'node:path';
import { GraphqlApi } from '../shared/graphql-api';
import { useTransaction } from '../shared/plugins/use-transaction';
import { Database } from '@/persistence/connection';
import { buildContext } from '../shared/context/build-context';
import { useErrorLogger } from '../shared/plugins/use-error-logger';
import { UserResolver } from './resolvers/user.resolver';
import { JwtService } from '@/libs/jwt';
import { useQueryLogger } from '../shared/plugins/use-query-logger';
import { ShopResolver } from './resolvers/shop.resolver';

const SHARED_TYPE_PATH = path.join(__dirname, '../shared/gql/**/*.gql');
const ADMIN_TYPE_PATH = path.join(__dirname, './**/*.gql');

export class AdminApi extends GraphqlApi {
  constructor(database: Database, jwtService: JwtService) {
    super({
      endpoint: '/admin-api',
      typePaths: [ADMIN_TYPE_PATH, SHARED_TYPE_PATH],
      resolvers: [UserResolver, ShopResolver],
      context: initialContext => buildContext(initialContext, database, jwtService),
      plugins: [useTransaction(), useErrorLogger(), useQueryLogger()]
    });
  }
}
