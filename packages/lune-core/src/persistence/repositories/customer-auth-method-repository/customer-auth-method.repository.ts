import type { Transaction } from '@/persistence/connection/connection';
import type {
  CustomerAuthMethod,
  CustomerAuthMethodTable
} from '@/persistence/entities/customer-auth-method';
import { CustomerAuthMethodSerializer } from '@/persistence/serializers/customer-auth-method.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CustomerAuthMethodRepository extends Repository<
  CustomerAuthMethod,
  CustomerAuthMethodTable
> {
  constructor(trx: Transaction) {
    super(Tables.CustomerAuthMethod, trx, new CustomerAuthMethodSerializer());
  }
}
