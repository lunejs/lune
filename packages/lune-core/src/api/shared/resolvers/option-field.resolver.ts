import type { ExecutionContext } from '../context/types';
import type { Option } from '../types/graphql';

export const CommonOptionFieldResolver = {
  values: async (parent: Option, _, ctx: ExecutionContext) => {
    const values = await ctx.loaders.option.values.load(parent.id);

    return values;
  }
};
