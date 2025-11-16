import { Card, CardHeader } from '@lune/ui';

import { ZoneCountriesSelector } from './selector';
import { ZoneCountriesSummary } from './summary';

export const ZoneCountries = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <ZoneCountriesSummary />
        <ZoneCountriesSelector />
      </CardHeader>
    </Card>
  );
};
