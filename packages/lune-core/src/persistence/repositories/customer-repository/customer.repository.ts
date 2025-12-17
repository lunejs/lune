import type { CustomerListInput } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import type { Customer, CustomerTable } from '@/persistence/entities/customer';
import { CustomerFilter } from '@/persistence/filters/customer.filter';
import { CustomerSerializer } from '@/persistence/serializers/customer.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CustomerRepository extends Repository<Customer, CustomerTable> {
  constructor(trx: Transaction) {
    super(Tables.Customer, trx, new CustomerSerializer());
  }

  async findByFilters(input: CustomerListInput) {
    const query = this.q();

    const result = await new CustomerFilter(query)
      .applyFilters(input.filters ?? {})
      .applyPagination(input)
      .build();

    return result.map(item => this.serializer.deserialize(item) as Customer);
  }

  async countByFilters(filters: CustomerListInput['filters']) {
    const query = this.q();

    new CustomerFilter(query).applyFilters(filters ?? {});

    const [{ count }] = await query.count({ count: '*' });

    return Number(count);
  }
}
