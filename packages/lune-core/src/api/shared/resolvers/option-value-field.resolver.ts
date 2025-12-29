import type { ExecutionContext } from '@/api/shared/context/types';
import type { OptionValue } from '@/persistence/entities/option_value';

export const CommonOptionValueFieldResolver = {
  name: async (parent: OptionValue, _, ctx: ExecutionContext) => {
    if (parent.customObjectEntryId) {
      const entry = await ctx.loaders.optionValues.customObjectEntry.load(
        parent.customObjectEntryId
      );
      if (!entry) return parent.name;

      const definition = await ctx.loaders.customObjectEntry.definition.load(entry.definitionId);
      if (!definition?.displayFieldId) return parent.name;

      const values = await ctx.loaders.customObjectEntry.values.load(entry.id);
      const displayValue = values.find(v => v.fieldId === definition.displayFieldId);

      return (displayValue?.value as string) ?? parent.name;
    }

    return parent.name;
  }
};
