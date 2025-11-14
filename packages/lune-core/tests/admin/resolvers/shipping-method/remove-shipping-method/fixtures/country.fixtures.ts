import type { CountryTable } from '@/persistence/entities/country';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

export const CountryConstants = {
  MxID: TestHelper.generateUUID(),
  MxCode: 'MX',
  UsID: TestHelper.generateUUID(),
  UsCode: 'US'
};

export class CountryFixtures implements Fixture<CountryTable> {
  table: Tables = Tables.Country;

  async build(): Promise<Partial<CountryTable>[]> {
    return [
      {
        id: CountryConstants.MxID,
        name: 'Mexico',
        code: CountryConstants.MxCode
      },
      {
        id: CountryConstants.UsID,
        name: 'United States',
        code: CountryConstants.UsCode
      }
    ];
  }
}
