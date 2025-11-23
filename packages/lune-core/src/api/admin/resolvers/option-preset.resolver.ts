import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  OptionPresetOptionValuesArgs,
  QueryOptionPresetsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { OptionPresetService } from '@/business/option-preset/option-preset.service';
import type { OptionPreset } from '@/persistence/entities/option-preset';

async function optionPresets(_, { input }: QueryOptionPresetsArgs, ctx: ExecutionContext) {
  const optionPresetService = new OptionPresetService(ctx);

  const [options, count] = await Promise.all([
    optionPresetService.find(input ?? {}),
    optionPresetService.count()
  ]);

  return new ListResponse(options, options.length, { total: count });
}

export const OptionPresetsResolver: GraphqlApiResolver = {
  Query: {
    optionPresets: UseUserGuard(optionPresets)
  },
  OptionPreset: {
    optionValues: async (
      parent: OptionPreset,
      args: OptionPresetOptionValuesArgs,
      ctx: ExecutionContext
    ) => {
      return ctx.loaders.optionPreset.optionValues.load({ id: parent.id, args: args.input });
    }
  }
};
