import path from 'node:path';
import { GraphqlApi } from '../shared/graphql-api';
import { useTransaction } from '../shared/plugins/use-transaction';
import { Database } from '@/persistence/connection';
import { buildContext } from '../shared/context/build-context';
import { useErrorLogger } from '../shared/plugins/use-error-logger';
import { JwtService } from '@/libs/jwt';
import { useQueryLogger } from '../shared/plugins/use-query-logger';
import { YogaInitialContext } from 'graphql-yoga';
import { UserJWT } from '../shared/types/api.types';

const SHARED_TYPE_PATH = path.join(__dirname, '../shared/gql/**/*.gql');
const SHOP_TYPE_PATH = path.join(__dirname, './**/*.gql');

export class ShopApi extends GraphqlApi {
  constructor(private readonly database: Database, private readonly jwtService: JwtService) {
    super({
      endpoint: '/shop-api',
      typePaths: [SHOP_TYPE_PATH, SHARED_TYPE_PATH],
      resolvers: [],
      context: initialContext => this.buildAdminApiContext(initialContext),
      plugins: [useTransaction(), useErrorLogger(), useQueryLogger()]
    });
  }

    private async buildAdminApiContext(initialContext: YogaInitialContext) {
      const rawHeader = initialContext.request.headers.get('authorization') ?? '';
  
      const shopId = initialContext.request.headers.get('x_vendyx_shop_id');
      const token = rawHeader.startsWith('Bearer ') ? rawHeader.replace('Bearer ', '') : '';
  
      const payload = token ? await this.jwtService.verifyToken<UserJWT>(token) : null;
  
      return buildContext(this.database, this.jwtService, shopId, payload);
    }
}
