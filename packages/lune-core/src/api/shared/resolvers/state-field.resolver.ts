import type { State } from '@/persistence/entities/state';

import type { ExecutionContext } from '../context/types';

export const CommonStateFieldResolver = {
  country: async (parent: State, _, ctx: ExecutionContext) => {
    const country = await ctx.loaders.state.country.load(parent.countryId);

    return country;
  }
};
