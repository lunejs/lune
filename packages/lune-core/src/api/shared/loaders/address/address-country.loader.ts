import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import type { Country, CountryTable } from '@/persistence/entities/country';
import { CountrySerializer } from '@/persistence/serializers/country.serializer';
import { Tables } from '@/persistence/tables';

export function createAddressCountryLoader(trx: Transaction) {
  return new DataLoader<string, Country>(async countryIds => {
    const serializer = new CountrySerializer();
    const rows = await trx<CountryTable>(Tables.Country).whereIn('id', countryIds).select('*');

    const map = new Map(rows.map(r => [r.id, serializer.deserialize(r) as Country]));
    return countryIds.map(id => map.get(id) as Country);
  });
}
