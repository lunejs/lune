import type { Transaction } from '@/persistence/connection';
import type { Customer, CustomerTable } from '@/persistence/entities/customer';
import { CustomerSerializer } from '@/persistence/serializers/customer.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CustomerRepository extends Repository<Customer, CustomerTable> {
  constructor(trx: Transaction) {
    super(Tables.Customer, trx, new CustomerSerializer());
  }
}
