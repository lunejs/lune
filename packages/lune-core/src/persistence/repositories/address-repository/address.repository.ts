import type { Transaction } from '@/persistence/connection';
import type { Address, AddressTable } from '@/persistence/entities/address';
import { AddressSerializer } from '@/persistence/serializers/address.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class AddressRepository extends Repository<Address, AddressTable> {
  constructor(trx: Transaction) {
    super(Tables.Address, trx, new AddressSerializer());
  }
}
