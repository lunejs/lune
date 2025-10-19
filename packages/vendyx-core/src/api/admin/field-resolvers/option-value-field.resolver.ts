import type { ExecutionContext } from '@/api/shared/context/types';
import type { OptionValue } from '@/api/shared/types/graphql';

export const OptionValueFieldResolver = {
  OptionValue: {
    translations: async (parent: OptionValue, _, ctx: ExecutionContext) => {
      return ctx.loaders.optionValues.translations.load(parent.id);
    }
  }
};
