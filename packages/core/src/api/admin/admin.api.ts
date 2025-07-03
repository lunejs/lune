import path from 'node:path';
import { GraphqlApi } from '../shared/graphql-api';
import { useTransaction } from '../shared/plugins/use-transaction';
import { Database } from '@/persistence/connection';
import { buildContext } from '../shared/context/build-context';
import { useErrorLogger } from '../shared/plugins/use-error-logger';
import { userResolver } from './resolvers/user.resolver';

const SHARED_TYPE_PATH = path.join(__dirname, '../shared/gql/**/*.gql');
const ADMIN_TYPE_PATH = path.join(__dirname, './**/*.gql');

export class AdminApi extends GraphqlApi {
  constructor(database: Database) {
    super({
      endpoint: '/admin-api',
      typePaths: [ADMIN_TYPE_PATH, SHARED_TYPE_PATH],
      resolvers: [userResolver],
      context: initialContext => buildContext(initialContext, database),
      plugins: [useTransaction(), useErrorLogger()]
    });
  }
}
