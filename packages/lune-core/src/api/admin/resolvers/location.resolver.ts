import { UseUserGuard } from '@/api/admin/guards/user.guard';
import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonLocationFieldResolver } from '@/api/shared/resolvers/location-field.resolver';
import type {
  MutationCreateLocationArgs,
  MutationRemoveLocationArgs,
  MutationUpdateCollectionArgs,
  MutationUpdateInStorePickupPreferencesArgs,
  QueryLocationArgs,
  QueryLocationsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { LocationService } from '@/business/location/location.service';
import type { Location } from '@/persistence/entities/location';
import { isErrorResult } from '@/utils/error-result';

async function locations(_, { input }: QueryLocationsArgs, ctx: ExecutionContext) {
  const locationService = new LocationService(ctx);

  const [locations, count] = await Promise.all([
    locationService.find(input ?? {}),
    locationService.count()
  ]);

  return new ListResponse(locations, locations.length, { total: count });
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

async function updateLocation(
  _,
  { id, input }: MutationUpdateCollectionArgs,
  ctx: ExecutionContext
) {
  const locationService = new LocationService(ctx);

  const result = await locationService.update(id, input);

  return isErrorResult(result)
    ? { apiErrors: [result], location: null }
    : { apiErrors: [], location: result };
}

async function removeLocation(_, { id }: MutationRemoveLocationArgs, ctx: ExecutionContext) {
  const locationService = new LocationService(ctx);

  return await locationService.remove(id);
}

async function updateInStorePickupPreferences(
  _,
  { locationId, input }: MutationUpdateInStorePickupPreferencesArgs,
  ctx: ExecutionContext
) {
  const locationService = new LocationService(ctx);

  return await locationService.updateInStorePickupPreferences(locationId, input);
}

export const LocationResolver: GraphqlApiResolver = {
  Query: {
    locations: UseUserGuard(locations),
    location: UseUserGuard(location)
  },
  Mutation: {
    createLocation: UseUserGuard(createLocation),
    updateLocation: UseUserGuard(updateLocation),
    removeLocation: UseUserGuard(removeLocation),
    updateInStorePickupPreferences: UseUserGuard(updateInStorePickupPreferences)
  },
  Location: {
    ...CommonLocationFieldResolver,
    inStorePickup: async (parent: Location, _, ctx: ExecutionContext) => {
      const location = await ctx.loaders.location.inStorePickup.load(parent.id);

      return location;
    }
  }
};
