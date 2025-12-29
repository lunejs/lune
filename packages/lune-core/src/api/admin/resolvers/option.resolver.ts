import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/admin/guards/user.guard';
import { CommonOptionFieldResolver } from '@/api/shared/resolvers/option-field.resolver';
import type {
  MutationCreateOptionArgs,
  MutationSoftRemoveOptionArgs,
  MutationSoftRemoveOptionValuesArgs,
  MutationUpdateOptionArgs
} from '@/api/shared/types/graphql';
import { OptionService } from '@/business/option/option.service';
import type { Option } from '@/persistence/entities/option';

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
  }
};
