import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { ListInput } from '@/api/shared/types/graphql';
import type { OptionPresetRepository } from '@/persistence/repositories/option-preset-repository';

export class OptionPresetService {
  private readonly repository: OptionPresetRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.optionPreset;
  }

  async find(input: ListInput) {
    return await this.repository.findMany(clean(input));
  }

  async count() {
    return await this.repository.count();
  }
}
