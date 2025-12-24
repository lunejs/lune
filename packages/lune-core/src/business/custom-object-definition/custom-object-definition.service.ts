import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreateCustomObjectDefinitionInput,
  CustomObjectDefinitionListInput,
  UpdateCustomObjectDefinitionInput
} from '@/api/shared/types/graphql';
import { getSlugBy } from '@/libs/slug';
import type { ID } from '@/persistence/entities/entity';
import type { CustomObjectDefinitionRepository } from '@/persistence/repositories/custom-object-definition-repository';

import { KeyAlreadyExistsError } from './custom-object-definition.errors';

export class CustomObjectDefinitionService {
  private readonly repository: CustomObjectDefinitionRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.customObjectDefinition;
  }

  async find(input?: CustomObjectDefinitionListInput) {
    return await this.repository.findByFilters(input ?? {});
  }

  async count(filters?: CustomObjectDefinitionListInput['filters']) {
    return await this.repository.countByFilters(filters);
  }

  async findUnique(id: ID) {
    return await this.repository.findOne({ where: { id } });
  }

  async create(input: CreateCustomObjectDefinitionInput) {
    const key = this.generateKey(input.name);

    const keyAlreadyExists = await this.repository.count({ where: { key } });
    if (keyAlreadyExists) return new KeyAlreadyExistsError(key);

    return await this.repository.create({
      name: input.name,
      key
    });
  }

  async update(id: ID, input: UpdateCustomObjectDefinitionInput) {
    if (input.name) {
      const key = this.generateKey(input.name);

      const existing = await this.repository.findOne({ where: { key } });
      if (existing && existing.id !== id) {
        return new KeyAlreadyExistsError(key);
      }

      return this.repository.update({
        where: { id },
        data: {
          ...clean(input),
          key
        }
      });
    }

    return this.repository.update({
      where: { id },
      data: clean(input)
    });
  }

  async remove(id: ID) {
    await this.repository.remove({ where: { id } });
    return true;
  }

  private generateKey(name: string) {
    return getSlugBy(name, { replacement: '_' });
  }
}
