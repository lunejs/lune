import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationCreateLocationArgs,
  QueryLocationArgs,
  QueryLocationsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { LocationService } from '@/business/location/location.service';
import { isErrorResult } from '@/utils/error-result';

async function locations(_, { input }: QueryLocationsArgs, ctx: ExecutionContext) {
  const locationService = new LocationService(ctx);

  const [products, count] = await Promise.all([
    locationService.find(input ?? {}),
    locationService.count()
  ]);

  return new ListResponse(products, products.length, { total: count });
}

async function location(_, { id }: QueryLocationArgs, ctx: ExecutionContext) {
  const locationService = new LocationService(ctx);

  return locationService.findById(id);
}

async function createLocation(_, { input }: MutationCreateLocationArgs, ctx: ExecutionContext) {
  const locationService = new LocationService(ctx);

  const result = await locationService.create(input);

  return isErrorResult(result)
    ? { apiErrors: [result], location: null }
    : { apiErrors: [], location: result };
}

export const LocationResolver: GraphqlApiResolver = {
  Query: {
    locations: UseUserGuard(locations),
    location: UseUserGuard(location)
  },
  Mutation: {
    createLocation: UseUserGuard(createLocation)
  }
};
