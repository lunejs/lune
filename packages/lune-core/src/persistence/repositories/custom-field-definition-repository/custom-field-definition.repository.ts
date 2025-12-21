import type { CustomFieldDefinitionListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '@/persistence/entities/custom-field-definition';
import { CustomFieldDefinitionFilter } from '@/persistence/filters/custom-field-definition.filter';
import { CustomFieldDefinitionSerializer } from '@/persistence/serializers/custom-field-definition.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CustomFieldDefinitionRepository extends Repository<
  CustomFieldDefinition,
  CustomFieldDefinitionTable
> {
  constructor(trx: Transaction) {
    super(Tables.CustomFieldDefinition, trx, new CustomFieldDefinitionSerializer());
  }

  async findByFilters(input: CustomFieldDefinitionListInput) {
    const query = this.q();

    const result = await new CustomFieldDefinitionFilter(query)
      .applyFilters(input.filters ?? {})
      .applyPagination(input)
      .applySort()
      .build();

    return result.map(item => this.serializer.deserialize(item) as CustomFieldDefinition);
  }

  async countByFilters(filters: CustomFieldDefinitionListInput['filters']) {
    const query = this.q();

    new CustomFieldDefinitionFilter(query).applyFilters(filters ?? {});

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }
}
