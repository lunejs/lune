import type { CustomObjectDefinitionListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import type {
  CustomObjectDefinition,
  CustomObjectDefinitionTable
} from '@/persistence/entities/custom-object-definition';
import { CustomObjectDefinitionFilter } from '@/persistence/filters/custom-object-definition.filter';
import { CustomObjectDefinitionSerializer } from '@/persistence/serializers/custom-object-definition.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CustomObjectDefinitionRepository extends Repository<
  CustomObjectDefinition,
  CustomObjectDefinitionTable
> {
  constructor(trx: Transaction) {
    super(Tables.CustomObjectDefinition, trx, new CustomObjectDefinitionSerializer());
  }

  async findByFilters(input: CustomObjectDefinitionListInput) {
    const query = this.q();

    const result = await new CustomObjectDefinitionFilter(query)
      .applyFilters(input.filters ?? {})
      .applyPagination(input)
      .build();

    return result.map(item => this.serializer.deserialize(item) as CustomObjectDefinition);
  }

  async countByFilters(filters: CustomObjectDefinitionListInput['filters']) {
    const query = this.q();

    new CustomObjectDefinitionFilter(query).applyFilters(filters ?? {});

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }
}
