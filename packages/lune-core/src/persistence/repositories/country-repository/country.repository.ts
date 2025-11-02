import type { Transaction } from '@/persistence/connection';
import type { Country, CountryTable } from '@/persistence/entities/country';
import { CountrySerializer } from '@/persistence/serializers/country.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class CountryRepository extends Repository<Country, CountryTable> {
  constructor(trx: Transaction) {
    super(Tables.Country, trx, new CountrySerializer());
  }
}
