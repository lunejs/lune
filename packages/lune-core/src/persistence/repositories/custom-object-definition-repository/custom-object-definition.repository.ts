import type { Transaction } from '@/persistence/connection';
import type {
  CustomObjectDefinition,
  CustomObjectDefinitionTable
} from '@/persistence/entities/custom-object-definition';
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
}
