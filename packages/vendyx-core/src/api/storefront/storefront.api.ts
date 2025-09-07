import path from 'node:path';

import { YogaInitialContext } from 'graphql-yoga';

import { JwtService } from '@/libs/jwt';
import { Database } from '@/persistence/connection';
import { Locale } from '@/persistence/entities/locale';

import { HeaderKeys } from '../shared/constants/headers.constants';
import { buildContext } from '../shared/context/build-context';
import { GraphqlApi } from '../shared/graphql-api';
import { useErrorLogger } from '../shared/plugins/use-error-logger';
import { useQueryLogger } from '../shared/plugins/use-query-logger';
import { useTransaction } from '../shared/plugins/use-transaction';
import { UserJWT } from '../shared/types/api.types';

import { ProductFieldResolver } from './field-resolvers/product-field.resolver';
import { ProductResolver } from './resolvers/product.resolver';

const SHARED_TYPE_PATH = path.join(__dirname, '../shared/gql/**/*.gql');
const SHOP_TYPE_PATH = path.join(__dirname, './**/*.gql');

export class StorefrontApi extends GraphqlApi {
  constructor(
    private readonly database: Database,
    private readonly jwtService: JwtService
  ) {
    super({
      endpoint: '/storefront-api',
      typePaths: [SHOP_TYPE_PATH, SHARED_TYPE_PATH],
      resolvers: [ProductResolver, ProductFieldResolver],
      context: initialContext => this.buildAdminApiContext(initialContext),
      plugins: [useTransaction(), useErrorLogger(), useQueryLogger()]
    });
  }

  private async buildAdminApiContext(initialContext: YogaInitialContext) {
    const rawHeader = initialContext.request.headers.get(HeaderKeys.Authorization) ?? '';

    const token = rawHeader.startsWith('Bearer ') ? rawHeader.replace('Bearer ', '') : '';
    const shopId = initialContext.request.headers.get(HeaderKeys.ShopId);
    const storefrontApiKey = initialContext.request.headers.get(HeaderKeys.StorefrontApiKey);
    const storefrontLocale = initialContext.request.headers.get(
      HeaderKeys.StorefrontLocale
    ) as Locale | null;

    const payload = token ? await this.jwtService.verifyToken<UserJWT>(token) : null;

    return buildContext(this.database, this.jwtService, shopId, payload, {
      apiKey: storefrontApiKey,
      locale: storefrontLocale
    });
  }
}
