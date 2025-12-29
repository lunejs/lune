import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/admin/guards/user.guard';
import { CommonCountryFieldResolver } from '@/api/shared/resolvers/country-field.resolver';
import { CountryService } from '@/business/country/country.service';

async function countries(_, __, ctx: ExecutionContext) {
  const countryService = new CountryService(ctx);

  return countryService.find();
}

export const CountryResolver: GraphqlApiResolver = {
  Query: {
    countries: UseUserGuard(countries)
  },
  Country: {
    ...CommonCountryFieldResolver
  }
};
