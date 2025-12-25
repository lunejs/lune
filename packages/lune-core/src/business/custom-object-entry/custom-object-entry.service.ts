import { customAlphabet } from 'nanoid';

import { clean, getSlugBy } from '@lune/common';

const generateRandomSuffix = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6);

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreateCustomObjectEntryInput,
  ListInput,
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

  async findUnique(id: ID) {
    return this.repository.findOne({ where: { id } });
  }

  async findByDefinitionId(definitionId: ID, input?: ListInput) {
    return this.repository.findMany({
      where: { definitionId },
      ...clean(input ?? {})
    });
  }

  async countByDefinitionId(definitionId: ID) {
    return this.repository.count({ where: { definitionId } });
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
            value: JSON.stringify(value.value)
          }))
      );
    }

    return entry;
  }

  async update(id: ID, input: UpdateCustomObjectEntryInput) {
    const entry = await this.repository.findOneOrThrow({ where: { id } });

    if (!input.values?.length) return entry;

    await Promise.all(
      input.values
        .filter(f => f.value == null)
        .map(f => this.valueRepository.remove({ where: { entryId: id, fieldId: f.id } }))
    );
    await Promise.all(
      input.values
        .filter(v => v.value != null)
        .map(cf =>
          this.valueRepository.upsert({
            where: { fieldId: cf.id, entryId: id },
            create: { entryId: entry.id, fieldId: cf.id, value: JSON.stringify(cf.value) },
            update: { value: JSON.stringify(cf.value) }
          })
        )
    );

    return await this.repository.update({ where: { id }, data: { updatedAt: new Date() } });
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
