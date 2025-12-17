import type { StateTable } from '@/persistence/entities/state';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants } from './country.fixtures';

export const StateConstants = {
  MxJaliscoID: TestUtils.generateUUID(),
  MxJaliscoCode: 'JAL'
};

export class StateFixtures implements Fixture<StateTable> {
  table: Tables = Tables.State;

  async build(): Promise<Partial<StateTable>[]> {
    return [
      {
        id: StateConstants.MxJaliscoID,
        name: 'Jalisco',
        code: StateConstants.MxJaliscoCode,
        country_id: CountryConstants.MxID
      }
    ];
  }
}
