import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { ListInput } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { CustomFieldDefinitionRepository } from '@/persistence/repositories/custom-field-definition-repository';
import { SortKey } from '@/persistence/repositories/repository';

export class CustomFieldDefinitionService {
  private readonly repository: CustomFieldDefinitionRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.customFieldDefinition;
  }

  async find(input?: ListInput) {
    return await this.repository.findMany({
      ...clean(input ?? {}),
      orderBy: { createdAt: SortKey.Asc }
    });
  }

  async count() {
    return await this.repository.count();
  }

  async findUnique(id: ID) {
    return await this.repository.findOne({ where: { id } });
  }
}
