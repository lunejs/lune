import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreateCustomFieldInput,
  CreateCustomObjectDefinitionInput,
  CustomObjectDefinitionListInput,
  UpdateCustomObjectDefinitionInput,
  UpdateCustomObjectFieldInput
} from '@/api/shared/types/graphql';
import { getSlugBy } from '@/libs/slug';
import type { CustomFieldType } from '@/persistence/entities/custom-field-definition';
import type { CustomObjectDefinition } from '@/persistence/entities/custom-object-definition';
import type { ID } from '@/persistence/entities/entity';
import type { CustomFieldDefinitionRepository } from '@/persistence/repositories/custom-field-definition-repository';
import type { CustomObjectDefinitionRepository } from '@/persistence/repositories/custom-object-definition-repository';

import { KeyAlreadyExistsError } from './custom-object-definition.errors';

export class CustomObjectDefinitionService {
  private readonly repository: CustomObjectDefinitionRepository;
  private readonly customFieldDefinitionRepository: CustomFieldDefinitionRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.customObjectDefinition;
    this.customFieldDefinitionRepository = ctx.repositories.customFieldDefinition;
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

    const customObjectDefinition = await this.repository.create({
      name: input.name,
      key
    });

    if (input.fields?.length) {
      await this.createFields(customObjectDefinition.id, input.fields);
    }

    const displayField = await this.customFieldDefinitionRepository.findOne({
      where: {
        customObjectDefinitionId: customObjectDefinition.id,
        name: input.displayFieldName
      }
    });

    if (displayField) {
      return this.repository.update({
        where: { id: customObjectDefinition.id },
        data: { displayFieldId: displayField.id }
      });
    }

    return customObjectDefinition;
  }

  async update(id: ID, input: UpdateCustomObjectDefinitionInput) {
    let customObjectDefinition: CustomObjectDefinition;

    if (input.name) {
      const key = this.generateKey(input.name);

      const existing = await this.repository.findOne({ where: { key } });
      if (existing && existing.id !== id) {
        return new KeyAlreadyExistsError(key);
      }

      customObjectDefinition = await this.repository.update({
        where: { id },
        data: { name: input.name, key }
      });
    } else {
      customObjectDefinition = await this.repository.findOneOrThrow({ where: { id } });
    }

    if (input.fields?.length) {
      await this.updateFields(input.fields);
    }

    if (input.displayFieldName) {
      const displayField = await this.customFieldDefinitionRepository.findOne({
        where: {
          customObjectDefinitionId: id,
          name: input.displayFieldName
        }
      });

      if (displayField) {
        return this.repository.update({
          where: { id },
          data: { displayFieldId: displayField.id }
        });
      }
    }

    return customObjectDefinition;
  }

  private async updateFields(fields: UpdateCustomObjectFieldInput[]) {
    await Promise.all(
      fields.map(field =>
        this.customFieldDefinitionRepository.update({
          where: { id: field.id },
          data: { name: field.name }
        })
      )
    );
  }

  async remove(id: ID) {
    await this.repository.remove({ where: { id } });
    return true;
  }

  private async createFields(customObjectDefinitionId: ID, fields: CreateCustomFieldInput[]) {
    await Promise.all(
      fields.map(field =>
        this.customFieldDefinitionRepository.create({
          name: field.name,
          key: this.generateKey(field.name),
          isList: field.isList,
          appliesToEntity: field.appliesToEntity,
          type: field.type as CustomFieldType,
          metadata: field.metadata ?? null,
          customObjectDefinitionId
        })
      )
    );
  }

  private generateKey(name: string) {
    return getSlugBy(name, { replacement: '_' });
  }
}
