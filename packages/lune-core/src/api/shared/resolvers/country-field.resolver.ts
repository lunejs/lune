import type { Country } from '@/persistence/entities/country';

import type { ExecutionContext } from '../context/types';

export const CommonCountryFieldResolver = {
  states: async (parent: Country, _, ctx: ExecutionContext) => {
    const country = await ctx.loaders.country.states.load(parent.id);

    return country;
  }
};
