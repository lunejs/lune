import path from 'node:path';

import { isTruthy } from '@lunejs/common';
import type { YogaInitialContext } from 'graphql-yoga';

import { getConfig } from '@/config/config';
import type { Database } from '@/persistence/connection/connection';
import type { Locale } from '@/persistence/entities/locale';
import { JwtService } from '@/security/jwt';

import { HeaderKeys } from '../shared/constants/headers.constants';
import { buildContext } from '../shared/context/build-context';
import { GraphqlApi } from '../shared/graphql-api';
import { useErrorLogger } from '../shared/plugins/use-error-logger';
import { useTransaction } from '../shared/plugins/use-transaction';
import { CustomFieldDefinitionEnumsResolver } from '../shared/resolvers/enums/custom-field-definition.enums.resolver';
import { OrderEnumsResolver } from '../shared/resolvers/enums/order-enums.resolver';
import type { CustomerJWT } from '../shared/types/api.types';

import { AddressResolver } from './resolvers/address.resolver';
import { CollectionResolver } from './resolvers/collection.resolver';
import { CountryResolver } from './resolvers/country.resolver';
import { CustomFieldResolver } from './resolvers/custom-field.resolver';
import { CustomObjectResolver } from './resolvers/custom-object.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { OrderResolver } from './resolvers/order.resolver';
import { ProductResolver } from './resolvers/product.resolver';

const SHARED_TYPE_PATH = path.join(__dirname, '../shared/gql/**/*.gql');
const SHOP_TYPE_PATH = path.join(__dirname, './**/*.gql');

export class StorefrontApi extends GraphqlApi {
  constructor(private readonly database: Database) {
    const { plugins } = getConfig();

    const pluginsTypePaths = plugins
      .flatMap(p => p.storefrontApiExtension?.typePaths)
      .filter(isTruthy);

    const pluginsResolvers = plugins
      .flatMap(p => p.storefrontApiExtension?.resolvers)
      .filter(isTruthy);

    super({
      endpoint: '/storefront-api',
      typePaths: [SHOP_TYPE_PATH, SHARED_TYPE_PATH, ...pluginsTypePaths],
      resolvers: [
        ProductResolver,
        CollectionResolver,
        OrderResolver,
        CountryResolver,
        CustomerResolver,
        AddressResolver,
        CustomFieldResolver,
        OrderEnumsResolver,
        CustomFieldDefinitionEnumsResolver,
        CustomObjectResolver,
        ...pluginsResolvers
      ],
      context: initialContext => this.buildAdminApiContext(initialContext),
      plugins: [useTransaction(), useErrorLogger()]
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

    const customerJWT = token ? await JwtService.verify<CustomerJWT>(token) : null;

    return buildContext({
      database: this.database,
      shopId,
      userJWT: null,
      storefront: {
        apiKey: storefrontApiKey,
        locale: storefrontLocale,
        currentCustomer: customerJWT ? { ...customerJWT, id: customerJWT.sub } : null
      }
    });
  }
}
