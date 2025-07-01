import path from 'node:path';
import { GraphqlApi } from '../shared/graphql-api';
import { useTransaction } from '../shared/plugins/use-transaction';
import { Database } from '@/persistence/connection';
import { buildContext } from '../shared/context/build-context';

const SHARED_TYPE_PATH = path.join(__dirname, '../shared/gql/**/*.gql');
const ADMIN_TYPE_PATH = path.join(__dirname, './**/*.gql');

export class AdminApi extends GraphqlApi {
  constructor(database: Database) {
    super({
      endpoint: '/admin-api',
      typePaths: [ADMIN_TYPE_PATH, SHARED_TYPE_PATH],
      resolvers: [
        {
          Query: {
            whoami: async (_, __, ctx) => {
              const r = await ctx.trx('users').select('*');

              return r[0];
            }
          }
        }
      ],
      context: initialContext => buildContext(initialContext, database),
      plugins: [useTransaction()]
    });
  }
}
