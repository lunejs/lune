import type { StateTable } from '@/persistence/entities/state';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';

export const StateConstants = {
  NewYorkID: TestUtils.generateUUID(),
  NewYorkCode: 'NY',

  CaliforniaID: TestUtils.generateUUID(),
  CaliforniaCode: 'CA'
};

export class StateFixtures implements Fixture<StateTable> {
  table: Tables = Tables.State;

  async build(): Promise<Partial<StateTable>[]> {
    return [
      {
        id: StateConstants.NewYorkID,
        name: 'New York',
        code: StateConstants.NewYorkCode,
        country_id: CountryConstants.ID
      },
      {
        id: StateConstants.CaliforniaID,
        name: 'California',
        code: StateConstants.CaliforniaCode,
        country_id: CountryConstants.ID
      }
    ];
  }
}
