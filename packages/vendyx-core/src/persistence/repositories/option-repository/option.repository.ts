import type { Transaction } from '@/persistence/connection';
import type { ID } from '@/persistence/entities/entity';
import type { Option, OptionTable } from '@/persistence/entities/option';
import type { OptionValue } from '@/persistence/entities/option_value';
import { OptionSerializer } from '@/persistence/serializers/option.serializer';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
import { Tables } from '@/persistence/tables';

import type { RepositoryInput } from '../repository';
import { Repository } from '../repository';

export class OptionRepository extends Repository<Option, OptionTable> {
  constructor(trx: Transaction) {
    super(Tables.Option, trx, new OptionSerializer());
  }

  /**
   * Find all option values for a given option
   */
  async findValues(optionId: ID): Promise<OptionValue[]> {
    const query = this.q(Tables.OptionValue).where('option_id', optionId);
    query.whereNull('deleted_at');

    const results = await query;

    const serializer = new OptionValueSerializer();
    return results.map(result => serializer.deserialize(result) as OptionValue);
  }

  /**
   * Soft remove multiple option values by their IDs
   */
  async softRemoveValues(ids: ID[]): Promise<void> {
    if (ids.length === 0) return;

    await this.q(Tables.OptionValue).whereIn('id', ids).update({ deleted_at: new Date() });
  }
}

export type CreateOptionWithValuesInput = RepositoryInput<Option> & {
  productId: ID;
  optionValues?: {
    name: string;
    order: number;
    metadata?: Record<string, any>;
  }[];
};

export type UpdateOptionWithValuesInput = Partial<RepositoryInput<Option>> & {
  optionValues?: {
    id?: ID;
    name?: string;
    order?: number;
    metadata?: Record<string, any>;
  }[];
};
