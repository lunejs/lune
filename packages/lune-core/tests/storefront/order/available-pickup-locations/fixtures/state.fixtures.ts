import type { StateTable } from '@/persistence/entities/state';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';

export const StateConstants = {
  ID: TestUtils.generateUUID()
};

export class StateFixtures implements Fixture<StateTable> {
  table: Tables = Tables.State;

  async build(): Promise<Partial<StateTable>[]> {
    return [
      {
        id: StateConstants.ID,
        name: 'New York',
        code: 'NY',
        country_id: CountryConstants.ID
      }
    ];
  }
}
