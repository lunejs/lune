import path from 'node:path';

import type { YogaInitialContext } from 'graphql-yoga';

import { isTruthy } from '@lune/common';

import { getConfig } from '@/config/config';
import type { Database } from '@/persistence/connection/connection';
import { JwtService } from '@/security/jwt';

import { HeaderKeys } from '../shared/constants/headers.constants';
import { buildContext } from '../shared/context/build-context';
import { GraphqlApi } from '../shared/graphql-api';
import { useErrorLogger } from '../shared/plugins/use-error-logger';
import { useTransaction } from '../shared/plugins/use-transaction';
import { OrderEnumsResolver } from '../shared/resolvers/enums/order-enums.resolver';
import type { UserJWT } from '../shared/types/api.types';

import { DeliveryMethodFieldResolver } from './field-resolvers/delivery-method-field.resolver';
import { OptionValueFieldResolver } from './field-resolvers/option-value-field.resolver';
import { OrderLineFieldResolver } from './field-resolvers/order-line-field.resolver';
import { StateFieldResolver } from './field-resolvers/state-field.resolver';
import { AssetResolver } from './resolvers/asset.resolver';
import { CollectionResolver } from './resolvers/collection.resolver';
import { CountryResolver } from './resolvers/country.resolver';
import { CustomFieldDefinitionResolver } from './resolvers/custom-field-definition.resolver';
import { CustomObjectDefinitionResolver } from './resolvers/custom-object-definition.resolver';
import { CustomObjectEntryResolver } from './resolvers/custom-object-entry.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { DiscountResolver } from './resolvers/discount.resolver';
import { LocationResolver } from './resolvers/location.resolver';
import { MetricResolver } from './resolvers/metric.resolver';
import { OptionResolver } from './resolvers/option.resolver';
import { OrderResolver } from './resolvers/order.resolver';
import { PaymentMethodResolver } from './resolvers/payment-method.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { ShippingMethodResolver } from './resolvers/shipping-method.resolver';
import { ShopResolver } from './resolvers/shop.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { VariantResolver } from './resolvers/variant.resolver';
import { ZoneResolver } from './resolvers/zone.resolver';

const SHARED_TYPE_PATH = path.join(__dirname, '../shared/gql/**/*.gql');
const ADMIN_TYPE_PATH = path.join(__dirname, './**/*.gql');

export class AdminApi extends GraphqlApi {
  constructor(private readonly database: Database) {
    const { plugins } = getConfig();

    const pluginsTypePaths = plugins.flatMap(p => p.adminApiExtension?.typePaths).filter(isTruthy);

    const pluginsResolvers = plugins.flatMap(p => p.adminApiExtension?.resolvers).filter(isTruthy);

    super({
      endpoint: '/admin-api',
      typePaths: [ADMIN_TYPE_PATH, SHARED_TYPE_PATH, ...pluginsTypePaths],
      resolvers: [
        UserResolver,
        ShopResolver,
        ProductResolver,
        VariantResolver,
        OptionResolver,
        OptionValueFieldResolver,
        CollectionResolver,
        OrderResolver,
        OrderLineFieldResolver,
        DeliveryMethodFieldResolver,
        ZoneResolver,
        StateFieldResolver,
        ShippingMethodResolver,
        CountryResolver,
        LocationResolver,
        PaymentMethodResolver,
        AssetResolver,
        DiscountResolver,
        CustomerResolver,
        CustomFieldDefinitionResolver,
        CustomObjectDefinitionResolver,
        CustomObjectEntryResolver,
        MetricResolver,
        OrderEnumsResolver,
        ...pluginsResolvers
      ],
      context: initialContext => this.buildAdminApiContext(initialContext),
      plugins: [useTransaction(), useErrorLogger()]
    });
  }

  private async buildAdminApiContext(initialContext: YogaInitialContext) {
    const rawHeader = initialContext.request.headers.get(HeaderKeys.Authorization) ?? '';

    const shopId = initialContext.request.headers.get(HeaderKeys.ShopId);
    const token = rawHeader.startsWith('Bearer ') ? rawHeader.replace('Bearer ', '') : '';

    const userJWT = token ? await JwtService.verify<UserJWT>(token) : null;

    return buildContext({
      database: this.database,
      shopId,
      userJWT,
      variables: initialContext.params.variables
    });
  }
}
