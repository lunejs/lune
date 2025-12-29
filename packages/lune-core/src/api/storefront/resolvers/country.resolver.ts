import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonCountryFieldResolver } from '@/api/shared/resolvers/country-field.resolver';
import { CountryService } from '@/business/country/country.service';

import { UseStorefrontApiKeyGuard } from '../guards/storefront-api-key.guard';

async function countries(_, __, ctx: ExecutionContext) {
  const countryService = new CountryService(ctx);

  return countryService.find();
}

export const CountryResolver: GraphqlApiResolver = {
  Query: {
    countries: UseStorefrontApiKeyGuard(countries)
  },
  Country: {
    ...CommonCountryFieldResolver
  }
};
