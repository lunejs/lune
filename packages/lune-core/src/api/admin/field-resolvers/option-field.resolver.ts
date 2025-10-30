import type { ExecutionContext } from '@/api/shared/context/types';
import { CommonOptionFieldResolver } from '@/api/shared/resolvers/option-field.resolver';
import type { Option } from '@/api/shared/types/graphql';

export const OptionFieldResolver = {
  Option: {
    ...CommonOptionFieldResolver,
    translations: async (parent: Option, _, ctx: ExecutionContext) => {
      return ctx.loaders.option.translations.load(parent.id);
    }
  }
};
