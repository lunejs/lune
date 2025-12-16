import type { Location } from '@/persistence/entities/location';

import type { ExecutionContext } from '../context/types';

export const CommonLocationFieldResolver = {
  country: async (parent: Location, _, ctx: ExecutionContext) => {
    const country = await ctx.loaders.location.country.load(parent.countryId);

    return country;
  },
  state: async (parent: Location, _, ctx: ExecutionContext) => {
    const country = await ctx.loaders.location.state.load(parent.stateId);

    return country;
  }
};
