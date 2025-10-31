import path from 'node:path';

import type { YogaInitialContext } from 'graphql-yoga';

import type { JwtService } from '@/libs/jwt';
import type { Database } from '@/persistence/connection';

import { HeaderKeys } from '../shared/constants/headers.constants';
import { buildContext } from '../shared/context/build-context';
import { GraphqlApi } from '../shared/graphql-api';
import { useErrorLogger } from '../shared/plugins/use-error-logger';
import { useQueryLogger } from '../shared/plugins/use-query-logger';
import { useTransaction } from '../shared/plugins/use-transaction';
import type { UserJWT } from '../shared/types/api.types';

import { CollectionFieldResolver } from './field-resolvers/collection-field.resolver';
import { OptionFieldResolver } from './field-resolvers/option-field.resolver';
import { OptionValueFieldResolver } from './field-resolvers/option-value-field.resolver';
import { ProductFieldResolver } from './field-resolvers/product-field.resolver';
import { VariantFieldResolver } from './field-resolvers/variant-filed.resolver';
import { CollectionResolver } from './resolvers/collection.resolver';
import { OptionResolver } from './resolvers/option.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { ShopResolver } from './resolvers/shop.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { VariantResolver } from './resolvers/variant.resolver';

const SHARED_TYPE_PATH = path.join(__dirname, '../shared/gql/**/*.gql');
const ADMIN_TYPE_PATH = path.join(__dirname, './**/*.gql');

export class AdminApi extends GraphqlApi {
  constructor(
    private readonly database: Database,
    private readonly jwtService: JwtService
  ) {
    super({
      endpoint: '/admin-api',
      typePaths: [ADMIN_TYPE_PATH, SHARED_TYPE_PATH],
      resolvers: [
        UserResolver,
        ShopResolver,
        ProductResolver,
        ProductFieldResolver,
        VariantResolver,
        VariantFieldResolver,
        OptionResolver,
        OptionFieldResolver,
        OptionValueFieldResolver,
        CollectionResolver,
        CollectionFieldResolver
      ],
      context: initialContext => this.buildAdminApiContext(initialContext),
      plugins: [useTransaction(), useErrorLogger(), useQueryLogger()]
    });
  }

  private async buildAdminApiContext(initialContext: YogaInitialContext) {
    const rawHeader = initialContext.request.headers.get(HeaderKeys.Authorization) ?? '';

    const shopId = initialContext.request.headers.get(HeaderKeys.ShopId);
    const token = rawHeader.startsWith('Bearer ') ? rawHeader.replace('Bearer ', '') : '';

    const userJWT = token ? await this.jwtService.verifyToken<UserJWT>(token) : null;

    return buildContext({
      database: this.database,
      jwtService: this.jwtService,
      shopId,
      userJWT,
      variables: initialContext.params.variables
    });
  }
}
