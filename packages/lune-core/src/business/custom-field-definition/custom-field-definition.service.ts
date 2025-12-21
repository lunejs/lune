import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreateCustomFieldInput,
  ListInput,
  UpdateCustomFieldInput
} from '@/api/shared/types/graphql';
import { getSlugBy } from '@/libs/slug';
import { CustomFieldType } from '@/persistence/entities/custom-field-definition';
import type { ID } from '@/persistence/entities/entity';
import type { CustomFieldDefinitionRepository } from '@/persistence/repositories/custom-field-definition-repository';
import { SortKey } from '@/persistence/repositories/repository';

import { InvalidMetadataError, KeyAlreadyExistsError } from './custom-field-definition.errors';

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

  async create(input: CreateCustomFieldInput) {
    if (input.type === CustomFieldType.Reference && !input.metadata?.targetEntity) {
      return new InvalidMetadataError('should contain metadata.targetEntity');
    }

    const key = this.generateKey(input.name);

    const keyAlreadyExists = await this.repository.count({ where: { key } });
    if (keyAlreadyExists) return new KeyAlreadyExistsError(key);

    return await this.repository.create({
      ...input,
      key,
      metadata: input.metadata ?? null
    });
  }

  async update(id: ID, input: UpdateCustomFieldInput) {
    return this.repository.update({
      where: { id },
      data: input
    });
  }

  private generateKey(name: string) {
    return getSlugBy(name, { replacement: '_' });
  }
}
