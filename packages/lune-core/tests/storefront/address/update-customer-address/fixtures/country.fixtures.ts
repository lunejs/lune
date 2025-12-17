import type { CountryTable } from '@/persistence/entities/country';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

export const CountryConstants = {
  MxID: TestUtils.generateUUID(),
  MxCode: 'MX'
};

export class CountryFixtures implements Fixture<CountryTable> {
  table: Tables = Tables.Country;

  async build(): Promise<Partial<CountryTable>[]> {
    return [
      {
        id: CountryConstants.MxID,
        name: 'Mexico',
        code: CountryConstants.MxCode
      }
    ];
  }
}
