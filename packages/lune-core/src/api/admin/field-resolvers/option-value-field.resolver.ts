import type { ExecutionContext } from '@/api/shared/context/types';
import { CommonOptionValueFieldResolver } from '@/api/shared/resolvers/option-value-field.resolver';
import type { OptionValue } from '@/persistence/entities/option_value';

export const OptionValueFieldResolver = {
  OptionValue: {
    ...CommonOptionValueFieldResolver,
    translations: async (parent: OptionValue, _, ctx: ExecutionContext) => {
      return ctx.loaders.optionValues.translations.load(parent.id);
    },
    customObjectEntry: async (parent: OptionValue, _, ctx: ExecutionContext) => {
      if (!parent.customObjectEntryId) return null;
      return ctx.loaders.optionValues.customObjectEntry.load(parent.customObjectEntryId);
    }
  }
};
