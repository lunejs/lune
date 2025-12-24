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

import { SlugAlreadyExistsError } from './custom-object-definition.errors';

export class CustomObjectDefinitionService {
  private readonly repository: CustomObjectDefinitionRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.customObjectDefinition;
  }

  async find(input?: CustomObjectDefinitionListInput) {
    return await this.repository.findMany({
      skip: input?.skip ?? undefined,
      take: input?.take ?? undefined
    });
  }

  async count() {
    return await this.repository.count({});
  }

  async findUnique(id: ID) {
    return await this.repository.findOne({ where: { id } });
  }

  async create(input: CreateCustomObjectDefinitionInput) {
    const slug = this.generateSlug(input.name);

    const slugAlreadyExists = await this.repository.count({ where: { slug } });
    if (slugAlreadyExists) return new SlugAlreadyExistsError(slug);

    return await this.repository.create({
      name: input.name,
      slug
    });
  }

  async update(id: ID, input: UpdateCustomObjectDefinitionInput) {
    if (input.name) {
      const slug = this.generateSlug(input.name);

      const existing = await this.repository.findOne({ where: { slug } });
      if (existing && existing.id !== id) {
        return new SlugAlreadyExistsError(slug);
      }

      return this.repository.update({
        where: { id },
        data: {
          ...clean(input),
          slug
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

  private generateSlug(name: string) {
    return getSlugBy(name, { replacement: '_' });
  }
}
