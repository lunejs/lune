import type { Knex } from 'knex';

import { LuneLogger } from '@/logger/lune.logger';
import { Tables } from '@/persistence/tables';
import type { CountryTable } from '@/persistence/entities/country';
import type { StateTable } from '@/persistence/entities/state';

import Countries from './countries.json';

export async function seedCountries(trx: Knex.Transaction) {
  for (const country of Countries) {
    const [countryCreated] = await trx<CountryTable>(Tables.Country)
      .insert({
        name: country.code,
        code: country.code
      })
      .returning('id');

    if (country.states.length > 0) {
      await trx<StateTable>(Tables.State).insert(
        country.states.map(s => ({
          code: s.code,
          name: s.name,
          country_id: countryCreated.id
        }))
      );
    }
  }

  LuneLogger.info(`Countries inserted: ${Countries.length}`);
}
