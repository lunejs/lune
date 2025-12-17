import path from 'node:path';

import type { YogaInitialContext } from 'graphql-yoga';

import type { JwtService } from '@/libs/jwt';
import type { Database } from '@/persistence/connection';
import type { Locale } from '@/persistence/entities/locale';

import { HeaderKeys } from '../shared/constants/headers.constants';
import { buildContext } from '../shared/context/build-context';
import { GraphqlApi } from '../shared/graphql-api';
import { useErrorLogger } from '../shared/plugins/use-error-logger';
import { useQueryLogger } from '../shared/plugins/use-query-logger';
import { useTransaction } from '../shared/plugins/use-transaction';
import type { CustomerJWT } from '../shared/types/api.types';

import { FulfillmentFieldResolver } from './field-resolvers/fulfillment-field.resolver';
import { LocationFieldResolver } from './field-resolvers/location-field.resolver';
import { OptionValueFieldResolver } from './field-resolvers/option-value-field.resolver';
import { OrderFieldResolver } from './field-resolvers/order-field.resolver';
import { OrderLineFieldResolver } from './field-resolvers/order-line-field.resolver';
import { ProductFieldResolver } from './field-resolvers/product-field.resolver';
import { ShippingMethodFieldResolver } from './field-resolvers/shipping-method-field.resolver';
import { VariantFieldResolver } from './field-resolvers/variant-field.resolver';
import { CountryResolver } from './resolvers/country.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { OrderResolver } from './resolvers/order.resolver';
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
      resolvers: [
        ProductResolver,
        ProductFieldResolver,
        OrderResolver,
        OrderFieldResolver,
        OrderLineFieldResolver,
        FulfillmentFieldResolver,
        CountryResolver,
        ShippingMethodFieldResolver,
        VariantFieldResolver,
        OptionValueFieldResolver,
        LocationFieldResolver,
        CustomerResolver
      ],
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

    const customerJWT = token ? await this.jwtService.verifyToken<CustomerJWT>(token) : null;

    return buildContext({
      database: this.database,
      jwtService: this.jwtService,
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
