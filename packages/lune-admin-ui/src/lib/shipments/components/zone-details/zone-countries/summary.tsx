import { useMemo } from 'react';

import { add3dots } from '@lunejs/common';
import { CardDescription, CardTitle } from '@lunejs/ui';

import { isStateInCountry } from '@/lib/shipments/utils/shipment.utils';

import { useZoneFormDetailsContext } from '../use-form/use-form';

export const ZoneCountriesSummary = () => {
  const { watch, countries } = useZoneFormDetailsContext();

  const states = watch('states');

  const [title, selectedCountries] = useMemo(() => {
    const selectedCountries = countries.filter(country => {
      return states.some(state => isStateInCountry(state, country));
    });

    const title = selectedCountries.map(country => country.name).join(', ');

    return [title, selectedCountries];
  }, [states, countries]);

  const description = useMemo(() => {
    if (selectedCountries.length === 1) {
      return `${states.length} ${states.length === 1 ? 'State' : 'States'}`;
    }

    return `${selectedCountries.length} ${selectedCountries.length === 1 ? 'Country' : 'Countries'} with ${states.length} ${states.length === 1 ? 'State' : 'States'}`;
  }, [selectedCountries, states]);

  if (!states.length) {
    return <CardTitle>Countries</CardTitle>;
  }

  return (
    <div className="flex flex-col gap-3">
      <CardTitle>{add3dots(title, 20)}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </div>
  );
};
