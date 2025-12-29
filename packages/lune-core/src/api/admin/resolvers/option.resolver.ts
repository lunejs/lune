import { UseUserGuard } from '@/api/admin/guards/user.guard';
import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonOptionFieldResolver } from '@/api/shared/resolvers/option-field.resolver';
import { CommonOptionValueFieldResolver } from '@/api/shared/resolvers/option-value-field.resolver';
import type {
  MutationCreateOptionArgs,
  MutationSoftRemoveOptionArgs,
  MutationSoftRemoveOptionValuesArgs,
  MutationUpdateOptionArgs
} from '@/api/shared/types/graphql';
import { OptionService } from '@/business/option/option.service';
import type { Option } from '@/persistence/entities/option';
import type { OptionValue } from '@/persistence/entities/option_value';

function createOption(_, { productId, input }: MutationCreateOptionArgs, ctx: ExecutionContext) {
  const optionService = new OptionService(ctx);

  return optionService.create(productId, input);
}

function updateOption(_, { id, input }: MutationUpdateOptionArgs, ctx: ExecutionContext) {
  const optionService = new OptionService(ctx);

  return optionService.update(id, input);
}

function softRemoveOption(_, { id }: MutationSoftRemoveOptionArgs, ctx: ExecutionContext) {
  const optionService = new OptionService(ctx);

  return optionService.softRemove(id);
}

function softRemoveOptionValues(
  _,
  { ids }: MutationSoftRemoveOptionValuesArgs,
  ctx: ExecutionContext
) {
  const optionService = new OptionService(ctx);

  return optionService.softRemoveValues(ids);
}

export const OptionResolver: GraphqlApiResolver = {
  Mutation: {
    createOption: UseUserGuard(createOption),
    updateOption: UseUserGuard(updateOption),
    softRemoveOption: UseUserGuard(softRemoveOption),
    softRemoveOptionValues: UseUserGuard(softRemoveOptionValues)
  },
  Option: {
    ...CommonOptionFieldResolver,
    translations: async (parent: Option, _, ctx: ExecutionContext) => {
      return ctx.loaders.option.translations.load(parent.id);
    }
  },
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
