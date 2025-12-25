import { customAlphabet } from 'nanoid';

import { getSlugBy } from '@lune/common';

const generateRandomSuffix = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6);

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreateCustomObjectEntryInput,
  UpdateCustomObjectEntryInput
} from '@/api/shared/types/graphql';
import type { CustomObjectDefinition } from '@/persistence/entities/custom-object-definition';
import type { ID } from '@/persistence/entities/entity';
import type { CustomObjectDefinitionRepository } from '@/persistence/repositories/custom-object-definition-repository';
import type { CustomObjectEntryRepository } from '@/persistence/repositories/custom-object-entry-repository';
import type { CustomObjectEntryValueRepository } from '@/persistence/repositories/custom-object-entry-value-repository';

export class CustomObjectEntryService {
  private readonly repository: CustomObjectEntryRepository;
  private readonly valueRepository: CustomObjectEntryValueRepository;
  private readonly definitionRepository: CustomObjectDefinitionRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.customObjectEntry;
    this.valueRepository = ctx.repositories.customObjectEntryValue;
    this.definitionRepository = ctx.repositories.customObjectDefinition;
  }

  async create(definitionId: ID, input: CreateCustomObjectEntryInput) {
    const definition = await this.definitionRepository.findOneOrThrow({
      where: { id: definitionId }
    });

    const slug = await this.genEntrySlug(definition, input);

    const entry = await this.repository.create({
      slug,
      definitionId
    });

    if (input.values?.length) {
      await this.valueRepository.createMany(
        input.values
          .filter(value => !!value.value)
          .map(value => ({
            entryId: entry.id,
            fieldId: value.id,
            value: JSON.stringify(value)
          }))
      );
    }

    return entry;
  }

  async update(_id: ID, _input: UpdateCustomObjectEntryInput) {
    throw new Error('not implemented');
  }

  async remove(ids: ID[]) {
    await this.repository.removeMany({ whereIn: 'id', values: ids });

    return true;
  }

  private async genEntrySlug(
    definition: CustomObjectDefinition,
    input: CreateCustomObjectEntryInput
  ) {
    if (definition.displayFieldId) {
      const displayFieldValue = input.values?.find(v => v.id === definition.displayFieldId);

      if (displayFieldValue) {
        return await this.validateAndParseSlug(displayFieldValue.value);
      }
    }

    return this.generateRandomSlug(definition.key);
  }

  private generateRandomSlug(definitionKey: string) {
    return `${definitionKey}-${generateRandomSuffix(8)}`;
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const count = await this.repository.count({ where: { slug } });

    if (!count) return slug;

    return slug + '-' + count;
  }
}
