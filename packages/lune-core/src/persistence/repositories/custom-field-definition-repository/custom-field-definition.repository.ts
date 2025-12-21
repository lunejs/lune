import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomFieldDefinition,
  CustomFieldDefinitionTable
} from '@/persistence/entities/custom-field-definition';
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
}
