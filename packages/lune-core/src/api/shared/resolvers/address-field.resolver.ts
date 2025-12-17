import type { Address } from '@/persistence/entities/address';

import type { ExecutionContext } from '../context/types';

export const CommonAddressFieldResolver = {
  country: (parent: Address, _: unknown, ctx: ExecutionContext) => {
    return ctx.loaders.address.country.load(parent.countryId);
  },
  state: (parent: Address, _: unknown, ctx: ExecutionContext) => {
    return ctx.loaders.address.state.load(parent.stateId);
  }
};
