import { getSlugBy } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreateCustomFieldInput,
  CustomFieldDefinitionListInput,
  UpdateCustomFieldInput
} from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { CollectionCustomFieldRepository } from '@/persistence/repositories/collection-custom-field-repository';
import type { CustomFieldDefinitionRepository } from '@/persistence/repositories/custom-field-definition-repository';
import type { ProductCustomFieldRepository } from '@/persistence/repositories/product-custom-field-repository';

import { KeyAlreadyExistsError } from './custom-field-definition.errors';

export class CustomFieldDefinitionService {
  private readonly repository: CustomFieldDefinitionRepository;
  private readonly productCustomFieldRepository: ProductCustomFieldRepository;
  private readonly collectionCustomFieldRepository: CollectionCustomFieldRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.customFieldDefinition;
    this.productCustomFieldRepository = ctx.repositories.productCustomField;
    this.collectionCustomFieldRepository = ctx.repositories.collectionCustomField;
  }

  async find(input?: CustomFieldDefinitionListInput) {
    return await this.repository.findByFilters(input ?? {});
  }

  async count(filters?: CustomFieldDefinitionListInput['filters']) {
    return await this.repository.countByFilters(filters);
  }

  async findUnique(id: ID) {
    return await this.repository.findOne({ where: { id } });
  }

  async create(input: CreateCustomFieldInput) {
    const key = this.generateKey(input.name);

    const keyAlreadyExists = await this.repository.count({
      where: { key, appliesToEntity: input.appliesToEntity }
    });
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

  async remove(id: ID) {
    await this.collectionCustomFieldRepository.remove({ where: { definitionId: id } });
    await this.productCustomFieldRepository.remove({ where: { definitionId: id } });
    await this.repository.remove({ where: { id } });

    return true;
  }

  private generateKey(name: string) {
    return getSlugBy(name, { replacement: '_' });
  }
}
