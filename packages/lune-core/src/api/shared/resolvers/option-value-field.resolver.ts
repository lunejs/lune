import type { ExecutionContext } from '@/api/shared/context/types';
import type { OptionValue } from '@/persistence/entities/option_value';

export const CommonOptionValueFieldResolver = {
  name: async (parent: OptionValue, _, ctx: ExecutionContext) => {
    if (!parent.presetId) return parent.name;

    const preset = await ctx.loaders.optionValues.preset.load(parent.presetId);
    return preset?.name ?? parent.name;
  }
};
