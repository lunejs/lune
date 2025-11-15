import type { Knex } from 'knex';

import { CountryRepository } from '@/persistence/repositories/country-repository';
import { StateRepository } from '@/persistence/repositories/state-repository';
import { LuneLogger } from '@/logger/lune.logger';

import Countries from './countries.json';

export async function seedCountries(trx: Knex.Transaction) {
  const countryRepository = new CountryRepository(trx);
  const stateRepository = new StateRepository(trx);

  for (const country of Countries) {
    const countryCreated = await countryRepository.create({
      name: country.code,
      code: country.code
    });

    await stateRepository.createMany(
      country.states.map(s => ({ code: s.code, name: s.name, countryId: countryCreated.id }))
    );
  }

  LuneLogger.info(`Countries inserted: ${Countries.length}`);
}
